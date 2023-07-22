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

  const handlePreview = (fileData: string, fileType: string) => {
    try {
      // Convert the fileData (base64 string) back to binary data
      const binaryData = atob(fileData);
  
      // Create a Uint8Array from the binary data
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
  
      // Create a blob from the Uint8Array and specify the file type
      const blob = new Blob([uint8Array], { type: fileType });
  
      // Create an object URL from the blob
      const fileURL = URL.createObjectURL(blob);
  
      // Open the file URL in a new browser tab
      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('Error handling file preview:', error);
    }
  };
  
  
  const handleDownload = async (id: number, filename: string) => {
    try {
      const response = await fetch(`${BASE_URL}/document/download/${id}`);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      console.log(id)
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log('Error downloading file:', error);
    }
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
                    <h3 className="text-lg font-medium">File Name: {file.filename}</h3>
                    <p className="text-sm text-gray-500">File Type: {file.fileType}</p>
                    <p className="text-sm text-gray-500">File Description: {file.description}</p>
                    <div className="text-sm text-gray-500">
                      ID: {file.id}
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handlePreview(file.data, file.fileType)} >
                        Preview
                      </button>
                      {/* <a
                        href={file.data}
                        download={file.filename}
                        className="text-blue-500 hover:underline ml-4" >
                        Download
                      </a> */}

                       <a
                        href="#"
                        onClick={() => handleDownload(file.id, file.filename)}
                        className="text-blue-500 hover:underline ml-4">
                        Download
                      </a>

                      <a href="#" className="text-blue-500 hover:underline ml-4">
                        Send As Email
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
