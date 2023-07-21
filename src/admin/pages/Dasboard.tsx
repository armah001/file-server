import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NavBar from '../../components/Navbar';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

interface File {
  id: number;
  filename: string;
  fileType: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [newFile, setNewFile] = useState<File>({
    id: 1,
    filename: '',
    fileType: '',
    description: '',
  });

  useEffect(() => {
    // Fetch files from the server or API
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/document/get`);
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.log('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', newFile.description)

      try {
        const response = await fetch(`${BASE_URL}/document/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const data = await response.json();
        setFiles(prevFiles => [...prevFiles, data]);
        setNewFile({
          id: newFile.id + 1,
          filename: '',
          fileType: '',
          description: '',
        });
        setUploadModalOpen(false);
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewFile((prevFile) => ({
        ...prevFile,
        filename: file.name,
        fileType: file.type,
        description: '', // Initialize description as an empty string
      }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <NavBar />

      {/* main body of the page */}

      <h3 className="text-xl font-bold mb-2">Files Uploaded: {files.length}</h3>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setUploadModalOpen(true)}
        >
          Upload File
        </button>
      </div>
      <h3 className="text-xl font-bold mb-2">Files:</h3>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">File Type</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td className="border px-4 py-2">{file.filename}</td>
              <td className="border px-4 py-2">{file.fileType}</td>
              <td className="border px-4 py-2">{file.description}</td>
              <td className="border px-4 py-2">{"Downloads"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={uploadModalOpen}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Upload File</h2>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setUploadModalOpen(false)}
          >
            Close
          </button>
        </div>
        {/* Modal Content */}
        <label className="block mb-4">
          Select File:
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            Choose File
          </button>
        </label>
        <label className="block mb-4">
          Title:
          <input
            type="text"
            value={newFile.filename}
            onChange={(e) => setNewFile({ ...newFile, filename: e.target.value })}
            className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </label>
        <label className="block">
          File Type:
          <input
            type="text"
            value={newFile.fileType}
            onChange={(e) => setNewFile({ ...newFile, fileType: e.target.value })}
            className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </label>
        <label className="block">
          File Description:
          <input
            type="text"
            value={newFile.description}
            onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
            className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleUpload}
        >
          Upload
        </button>
      </Modal>
    </div>
  );
};

export default Dashboard;
