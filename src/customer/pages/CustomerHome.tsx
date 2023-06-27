import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface File {
  id: number;
  title: string;
  description: string;
  downloads: number;
  emailsSent: number;
}

const CustomerHome: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated data fetch or API call
  useEffect(() => {
    // Fetch files from the server or API
    // Update the 'files' state with the response
    const fetchFiles = async () => {
      try {
        // Simulated data
        const response = await fetch('https://api.example.com/files');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.log('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleLogout = () => {
      localStorage.removeItem("customerAuthLoginToken");
      localStorage.removeItem("customerAuthSignUpToken");
      window.location.reload();
      // navigate('/customer/login');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter files based on the search term
  const filteredFiles = files.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='h-screen overflow-auto'>
      <div className="flex justify-between items-center bg-gray-300 p-4 mb-4">
        <button
          className="text-blue-500 hover:text-blue-700 font-bold"
          onClick={() => navigate('/file-server')}
        >
          Home
        </button>

        <div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className='px-10'>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-5">
          <div>
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
            {/* <ul>
              {filteredFiles.map((file) => (
                <li key={file.id} className="mb-2">
                  <div>
                    <h3 className="text-lg font-medium">{file.title}</h3>
                    <p className="text-sm text-gray-500">{file.description}</p>
                    <div className="text-sm text-gray-500">
                      Downloads: {file.downloads}, Emails Sent: {file.emailsSent}
                    </div>
                    <a href={`/file-server/files/${file.id}`} className="text-blue-500 hover:underline">
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
