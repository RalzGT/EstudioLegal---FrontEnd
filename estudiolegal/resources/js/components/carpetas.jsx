import React, { useState } from 'react';

// Componente recursivo para mostrar carpetas
const Folder = ({ folder, path, onSelect, selectedPath }) => {
  const [isOpen, setIsOpen] = useState(path.length === 0);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onSelect(path);
  };

  return (
    <div className="ml-4">
      <div
        onClick={handleClick}
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
          />
        ))}
    </div>
  );
};

// Componente para mostrar archivos en tabla
const FileTable = ({ files }) => {
  return (
    <div className="overflow-y-auto w-full max-h-[80vh]">
      <div className="grid grid-cols-4 gap-4 text-sm text-gray-400 font-semibold border-b py-2 px-2">
        <div>Nombre</div>
        <div>Propietario</div>
        <div>Fecha</div>
        <div className="text-right">Tamaño</div>
      </div>
      {files.map((file, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 py-2 items-center px-2 hover:bg-gray-100 rounded text-sm text-gray-800"
        >
          <div className="flex items-center gap-2">
            📄 {file.name}
          </div>
          <div>{file.owner}</div>
          <div>{file.date}</div>
          <div className="text-right">{file.size}</div>
        </div>
      ))}
    </div>
  );
};

// Función auxiliar para obtener una carpeta a partir de un path
const getFolderByPath = (root, path) => {
  let current = root;
  for (let index of path) {
    current = current.children[index];
  }
  return current;
};

// Componente principal
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

  // Crear nueva subcarpeta en la carpeta seleccionada
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

  // Obtener archivos de la carpeta seleccionada
  const getFilesFromSelected = () => {
    return getFolderByPath(structure, selectedPath).files || [];
  };

  // Obtener nombre actual de carpeta
  const getFolderName = () => {
    return getFolderByPath(structure, selectedPath).name;
  };

  return (
    <div className="h-screen w-full flex bg-white text-gray-800 font-sans">
      {/* Explorador de carpetas */}
      <div className="w-1/4 p-4 border-r border-gray-300 overflow-y-auto max-h-screen">
        <h2 className="text-lg font-bold mb-4">Carpetas</h2>
        <Folder
          folder={structure}
          path={[]}
          onSelect={setSelectedPath}
          selectedPath={selectedPath}
        />
      </div>

      {/* Vista de archivos */}
      <div className="w-3/4 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{getFolderName()}</h2>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            onClick={createFolder}
          >
            Nueva carpeta
          </button>
        </div>
        <FileTable files={getFilesFromSelected()} />
      </div>
    </div>
  );
};

export default FileExplorer;
