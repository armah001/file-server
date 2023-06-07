import React from 'react';
import { Link } from 'react-router-dom';

export default function NoPage() {
  return (
    <div>
      <div className="hero min-h-screen bg-gradient-to-r from-pink-100 to-gray-300">

          <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  404 Page Cannot Be Found
                </h1>
                <p className="py-6">
                    This page does not exist
                </p>
                <Link to="/file-server">
                    <button className="btn btn-neutral ">
                        Home
                    </button>
                </Link>
              </div>
            </div>
        </div>
        
    </div>
  )
}
