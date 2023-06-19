import React, { useState } from 'react';
import Modal from 'react-modal';
import File from '../../interfaces/File';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<string>('John Doe');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [newFile, setNewFile] = useState<File>({
    id: 1,
    title: '',
    description: '',
    downloads: 0,
    emailsSent: 0,
  });

  const navigate = useNavigate();

  const handleUpload = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles(prevFiles => [
          ...prevFiles,
          { ...newFile, title: newFile.title, description: newFile.description },
        ]);
        setNewFile({
          id: newFile.id + 1,
          title: '',
          description: '',
          downloads: 0,
          emailsSent: 0,
        });
        setUploadModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFile((prevFile) => ({
          ...prevFile,
          title: file.name,
          // You can set other properties like file size, type, etc.
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    setUser('');
    navigate('/file-server'); // Redirect to the homepage
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center bg-gray-300 p-4 mb-4">
        <button
          className="text-blue-500 hover:text-blue-700 font-bold"
          onClick={() => navigate('/file-server')}
        >
          Home
        </button>
        <h2 className="text-2xl font-bold">Welcome, {user}</h2>
        <div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
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
            <th className="px-4 py-2">Downloads</th>
            <th className="px-4 py-2">Emails Sent</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              <td className="border px-4 py-2">{file.title}</td>
              <td className="border px-4 py-2">{file.downloads}</td>
              <td className="border px-4 py-2">{file.emailsSent}</td>
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
            value={newFile.title}
            onChange={(e) => setNewFile({ ...newFile, title: e.target.value })}
            className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </label>
        <label className="block">
          Description:
          <textarea
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
