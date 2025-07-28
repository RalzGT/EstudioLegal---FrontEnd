import React, { useState } from 'react';

const Folder = ({ folder, path, onSelect, selectedPath, onFolderContextMenu }) => {
  const [isOpen, setIsOpen] = useState(path.length === 0);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onSelect(path);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onFolderContextMenu(e, path, folder.name);
  };

  return (
    <div className="ml-4">
      <div
        onClick={handleClick}
        onContextMenu={handleRightClick}
        className={`cursor-pointer py-1 px-2 rounded ${selectedPath.join(',') === path.join(',')
          ? 'bg-blue-200 text-blue-900 font-semibold'
          : 'text-blue-700 hover:bg-blue-100'
          }`}
      >
        📁 {folder.name}
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
          />
        ))}
    </div>
  );
};

const FileTable = ({ files, onFileContextMenu }) => {
  return (
    <div className="overflow-y-auto w-full max-h-[80vh]">
      <div className="grid grid-cols-5 gap-4 text-sm text-gray-400 font-semibold border-b py-2 px-2">
        <div>Nombre</div>
        <div>Propietario</div>
        <div>Fecha</div>
        <div className="text-right">Tamaño</div>
        <div className="text-right">Acciones</div>
      </div>
      {files.map((file, index) => (
        <div
          key={index}
          onContextMenu={(e) => onFileContextMenu(e, file)}
          className="grid grid-cols-5 gap-4 py-2 items-center px-2 hover:bg-gray-100 rounded text-sm text-gray-800"
        >
          <div className="flex items-center gap-2">📄 {file.name}</div>
          <div>{file.owner}</div>
          <div>{file.date}</div>
          <div className="text-right">{file.size}</div>
          <div className="text-right text-gray-400 italic">Clic derecho</div>
        </div>
      ))}
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

const FileExplorer = () => {
  const [structure, setStructure] = useState({
    name: 'Root',
    files: [],
    children: [
      {
        name: 'Contratos',
        files: [{ name: 'Contrato1.pdf', owner: 'yo', date: '10 jul 2024', size: '312 KB' }],
        children: [],
      },
      {
        name: 'Documentos',
        files: [{ name: 'Oficio.docx', owner: 'yo', date: '20 may 2024', size: '180 KB' }],
        children: [],
      },
    ],
  });

  const [selectedPath, setSelectedPath] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, file: null });
  const [folderContextMenu, setFolderContextMenu] = useState({ visible: false, x: 0, y: 0, path: null });

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

    const updatedStructure = structuredClone(structure);
    const targetFolder = getFolderByPath(updatedStructure, selectedPath);

    files.forEach(file => {
      targetFolder.files.push({
        name: file.name,
        owner: 'yo',
        date: new Date().toLocaleDateString(),
        size: (file.size / 1024).toFixed(1) + ' KB',
      });
    });

    setStructure(updatedStructure);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!droppedFiles.length) return;

    const updatedStructure = structuredClone(structure);
    const targetFolder = getFolderByPath(updatedStructure, selectedPath);

    droppedFiles.forEach(file => {
      targetFolder.files.push({
        name: file.name,
        owner: 'yo',
        date: new Date().toLocaleDateString(),
        size: (file.size / 1024).toFixed(1) + ' KB',
      });
    });

    setStructure(updatedStructure);
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
          <h2 className="text-lg font-bold mb-4">Carpetas</h2>
          <Folder
            folder={structure}
            path={[]}
            onSelect={setSelectedPath}
            selectedPath={selectedPath}
            onFolderContextMenu={handleFolderContextMenu}
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

          <FileTable files={getFilesFromSelected()} onFileContextMenu={handleFileContextMenu} />
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

    </div>
  );
};

export default FileExplorer;
