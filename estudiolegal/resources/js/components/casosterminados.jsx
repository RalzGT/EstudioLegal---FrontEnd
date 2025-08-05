import React, { useState } from 'react';

const Folder = ({ folder, path, onSelect, selectedPath, onFolderContextMenu, searchTerm, matchesSearch }) => {
  const [isOpen, setIsOpen] = useState(path.length === 0 || matchesSearch); 

  const handleClick = () => {
    setIsOpen(!isOpen);
    onSelect(path);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onFolderContextMenu(e, path, folder.name);
  };


  const folderMatches = (folder, searchTerm) => {
    if (!searchTerm) return true;
    
    if (folder.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    
    if (folder.children && folder.children.length > 0) {
      return folder.children.some(child => folderMatches(child, searchTerm));
    }
    
    return false;
  };

  const currentMatches = folderMatches(folder, searchTerm);
  const nameMatches = searchTerm && folder.name.toLowerCase().includes(searchTerm.toLowerCase());

  if (searchTerm && !currentMatches) {
    return null;
  }

  return (
    <div className="ml-4">
      <div
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={`cursor-pointer py-1 px-2 rounded ${selectedPath.join(',') === path.join(',')
          ? 'bg-blue-200 text-blue-900 font-semibold'
          : 'text-blue-700 hover:bg-blue-100'
          } ${nameMatches ? 'bg-yellow-100 border border-yellow-300' : ''}`}
      >
        📁 <span className={nameMatches ? 'bg-yellow-200 px-1 rounded' : ''}>{folder.name}</span>
      </div>

      {isOpen &&
        folder.children &&
        folder.children.map((child, index) => (
          <Folder
            key={index}
            folder={child}
            path={[...path, index]}
            onSelect={onSelect}
            selectedPath={selectedPath}
            onFolderContextMenu={onFolderContextMenu}
            searchTerm={searchTerm}
            matchesSearch={matchesSearch}
          />
        ))}
    </div>
  );
};

const FileTable = ({ files, onFileContextMenu, searchTerm }) => {
  const filteredFiles = files.filter(file => {
    if (!searchTerm) return true;
    return file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="overflow-y-auto w-full max-h-[80vh]">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-sm text-gray-400 font-semibold border-b">
            <th className="text-left py-2 px-2">Nombre</th>
            <th className="text-left py-2 px-2">Propietario</th>
            <th className="text-left py-2 px-2">Fecha</th>
            <th className="text-left py-2 px-2">Descripción</th>
            <th className="text-right py-2 px-2">Tamaño</th>
            <th className="text-right py-2 px-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-8 text-center text-gray-500">
                {searchTerm ? 'No se encontraron archivos que coincidan con la búsqueda' : 'No hay archivos en esta carpeta'}
              </td>
            </tr>
          ) : (
            filteredFiles.map((file, index) => {
              const nameMatches = searchTerm && file.name.toLowerCase().includes(searchTerm.toLowerCase());
              const descriptionMatches = searchTerm && file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase());
              
              return (
                <tr
                  key={index}
                  onContextMenu={(e) => onFileContextMenu(e, file)}
                  className={`hover:bg-gray-100 text-sm text-gray-800 ${
                    (nameMatches || descriptionMatches) ? 'bg-yellow-50 border-l-4 border-yellow-300' : ''
                  }`}
                >
                  <td className="py-2 px-2 align-top">
                    <div className="flex items-center gap-2">
                      📄 <span className={`${nameMatches ? 'bg-yellow-200 px-1 rounded' : ''}`}>{file.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2 align-top whitespace-nowrap">{file.owner}</td>
                  <td className="py-2 px-2 align-top whitespace-nowrap">{file.date}</td>
                  <td className={`py-2 px-2 align-top ${descriptionMatches ? 'bg-yellow-200 px-1 rounded' : ''}`}>
                    {file.description || '-'}
                  </td>
                  <td className="py-2 px-2 align-top text-right whitespace-nowrap">{file.size}</td>
                  <td className="py-2 px-2 align-top text-right text-gray-400 italic whitespace-nowrap">Clic derecho</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const getFolderByPath = (root, path) => {
  let current = root;
  for (let index of path) {
    current = current.children[index];
  }
  return current;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FileExplorer2 = () => {
  const [structure, setStructure] = useState({
    name: 'Finalizados',
    files: [],
    children: [
      {
        name: 'Contratos',
        files: [{ name: 'Contrato1.pdf', owner: 'yo', date: '10 jul 2024', size: '312 KB', description: 'Contrato anual' }],
        children: [],
      },
      {
        name: 'Documentos',
        files: [{ name: 'Oficio.docx', owner: 'yo', date: '20 may 2024', size: '180 KB', description: 'Oficio enviado a cliente' }],
        children: [],
      },
    ],
  });

  const [selectedPath, setSelectedPath] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, file: null });
  const [folderContextMenu, setFolderContextMenu] = useState({ visible: false, x: 0, y: 0, path: null });
  const [pendingFiles, setPendingFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [folderSearchTerm, setFolderSearchTerm] = useState('');
  const [fileSearchTerm, setFileSearchTerm] = useState('');

  const createFolder = () => {
    const folderName = prompt('Nombre de la nueva carpeta:');
    if (!folderName) return;

    const updatedStructure = structuredClone(structure);
    const target = getFolderByPath(updatedStructure, selectedPath);
    target.children.push({
      name: folderName,
      files: [],
      children: [],
    });

    setStructure(updatedStructure);
  };

  const getFilesFromSelected = () => {
    return getFolderByPath(structure, selectedPath).files || [];
  };

  const getFolderName = () => {
    return getFolderByPath(structure, selectedPath).name;
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    setPendingFiles(files);
    setShowModal(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!droppedFiles.length) return;
    setPendingFiles(droppedFiles);
    setShowModal(true);
  };

  const confirmUpload = () => {
    const updatedStructure = structuredClone(structure);
    const targetFolder = getFolderByPath(updatedStructure, selectedPath);

    pendingFiles.forEach(file => {
      targetFolder.files.push({
        name: file.name,
        owner: 'yo',
        date: new Date().toLocaleDateString(),
        size: formatFileSize(file.size),
        description: description || '',
      });
    });

    setStructure(updatedStructure);
    setPendingFiles([]);
    setDescription('');
    setShowModal(false);
  };

  const handleClick = () => {
    if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0, file: null });
    if (folderContextMenu.visible) setFolderContextMenu({ visible: false, x: 0, y: 0, path: null });
  };

  const handleFileContextMenu = (e, file) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, file });
    setFolderContextMenu({ visible: false, x: 0, y: 0, path: null });
  };

  const handleFolderContextMenu = (e, path, name) => {
    e.preventDefault();
    setFolderContextMenu({ visible: true, x: e.pageX, y: e.pageY, path });
    setContextMenu({ visible: false, x: 0, y: 0, file: null });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `/archivos/${encodeURIComponent(contextMenu.file.name)}`;
    link.download = contextMenu.file.name;
    link.click();
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleEdit = () => {
    const newName = prompt("Nuevo nombre del archivo:", contextMenu.file.name);
    if (!newName) return;

    const updatedStructure = structuredClone(structure);
    const target = getFolderByPath(updatedStructure, selectedPath);
    const file = target.files.find(f => f.name === contextMenu.file.name);
    if (file) file.name = newName;
    setStructure(updatedStructure);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDelete = () => {
    const confirmed = confirm(`¿Seguro que deseas eliminar "${contextMenu.file.name}"?`);
    if (!confirmed) return;

    const updatedStructure = structuredClone(structure);
    const target = getFolderByPath(updatedStructure, selectedPath);
    target.files = target.files.filter(f => f.name !== contextMenu.file.name);
    setStructure(updatedStructure);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDeleteFolder = () => {
    if (!folderContextMenu.path || folderContextMenu.path.length === 0) return;
    const confirmed = confirm(`¿Eliminar carpeta "${getFolderByPath(structure, folderContextMenu.path).name}"?`);
    if (!confirmed) return;

    const updatedStructure = structuredClone(structure);
    const parentPath = folderContextMenu.path.slice(0, -1);
    const index = folderContextMenu.path.slice(-1)[0];
    const parent = getFolderByPath(updatedStructure, parentPath);
    parent.children.splice(index, 1);

    setStructure(updatedStructure);
    setFolderContextMenu({ visible: false, x: 0, y: 0, path: null });
  };

  return (
    <div onClick={handleClick} className="relative">
      <div className="h-screen w-full flex bg-white text-gray-800 font-sans">
        <div className="w-1/4 p-4 border-r border-gray-300 overflow-y-auto max-h-screen">
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              name="folderSearch" 
              id="folderSearch" 
              className='border border-gray-200 shadow-sm mb-2 w-full p-1 rounded' 
              value={folderSearchTerm}
              onChange={(e) => setFolderSearchTerm(e.target.value)}
              placeholder="Escribir nombre de carpeta..."
            />
          </form>
          <hr className='text-gray-400' />
          <h2 className="text-lg font-bold mb-4">Carpetas</h2>
          <Folder
            folder={structure}
            path={[]}
            onSelect={setSelectedPath}
            selectedPath={selectedPath}
            onFolderContextMenu={handleFolderContextMenu}
            searchTerm={folderSearchTerm}
            matchesSearch={folderSearchTerm !== ''}
          />
        </div>

        <div
          className="w-3/4 p-6 overflow-y-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{getFolderName()}</h2>
            <div className="flex items-center">
              <form onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  name="fileSearch" 
                  id="fileSearch" 
                  className='border border-gray-200 shadow-sm mr-2 p-1 rounded' 
                  value={fileSearchTerm}
                  onChange={(e) => setFileSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o descripción..."
                />
              </form>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded hover:cursor-pointer hover:bg-blue-700"
                onClick={createFolder}
              >
                Nueva carpeta
              </button>
              <input
                type="file"
                onChange={handleFileUpload}
                multiple
                className="hidden"
                id="fileUpload"
              />
              <label htmlFor="fileUpload">
                <div className="bg-green-600 text-white px-4 py-1 rounded hover:cursor-pointer hover:bg-green-700 ml-2">
                  + Archivo
                </div>
              </label>
            </div>
          </div>

          <FileTable 
            files={getFilesFromSelected()} 
            onFileContextMenu={handleFileContextMenu} 
            searchTerm={fileSearchTerm}
          />
        </div>
      </div>

      {/* Menú contextual archivos */}
      {contextMenu.visible && (
        <div
          style={{
            top: `${contextMenu.y + 2}px`,
            left: `${contextMenu.x + 2}px`,
            position: 'fixed',
            zIndex: 1000
          }}
          className="bg-white border shadow-md rounded w-48"
        >
          <button onClick={handleDownload} className="w-full text-left px-4 py-2 hover:bg-gray-100">📥 Descargar</button>
          <button onClick={handleEdit} className="w-full text-left px-4 py-2 hover:bg-gray-100">✏️ Editar</button>
          <button onClick={handleDelete} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">🗑️ Eliminar</button>
        </div>
      )}

      {/* Menú contextual carpetas */}
      {folderContextMenu.visible && (
        <div
          style={{
            top: `${folderContextMenu.y + 2}px`,
            left: `${folderContextMenu.x + 2}px`,
            position: 'fixed',
            zIndex: 1000
          }}
          className="bg-white border shadow-md rounded w-48"
        >
          <button onClick={handleDeleteFolder} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
            🗑️ Eliminar carpeta
          </button>
        </div>
      )}

      {/* Modal de descripción */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Agregar descripción</h2>
            <p className="mb-2">Archivos:</p>
            <ul className="text-sm mb-4 list-disc list-inside text-gray-600">
              {pendingFiles.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4 resize-none"
              placeholder="Descripción del archivo..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowModal(false); setPendingFiles([]); setDescription(''); }}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmUpload}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer2;