import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

interface File {
  id: number;
  filename: string;
  fileType: string;
  data: string; // Assuming data is a string representing file content or some URL
  description: string;
}

const CustomerHome: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className='h-screen overflow-auto'>
      <div className='px-10'>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-5">
          <div>
            <NavBar />
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-medium text-gray-900 mb-4 capitalize">
                Welcome Back,
              </h2>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search files"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <ul>
              {filteredFiles.map((file) => (
                <li key={file.id} className="mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{file.filename}</h3>
                    <p className="text-sm text-gray-500">{file.fileType}</p>
                    <div className="text-sm text-gray-500">
                      ID: {file.id}
                    </div>
                    <div>
                      <button
                        onClick={() => handlePreview(file.data)}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        Preview
                      </button>
                      <a href={file.data} className="text-blue-500 hover:underline">
                        Download
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
