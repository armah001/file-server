import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (

        <div className='h-screen bg-gradient-to-r  from-pink-200 to-gray-100 '>
            {error && (
                <div className="bg-red-500 text-white py-4 px-6 mx-3 mt-2 rounded-lg" role="alert">
                    <strong className="font-medium">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="isolate hero min-h-screen">
                <div className="h-screen overflow-hidden flex items-center justify-cente" >
                    <form method="post">
                        <div style={{ width: "40rem" }} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Email
                                    </label>
                                    <input name="email" onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                            </div>

                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Password
                                    </label>
                                    <input name="password" onChange={handleChange} type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    <p className="text-grey-dark text-xs italic">Please use a secure password</p>
                                    <span className='text-black text-xs font-medium'>Don't have an account?  <a href='/customer/signup' className='underline'> Sign Up </a></span>
                                    <br></br>
                                    <span className='text-black text-xs font-medium'>Forgotten your password?  <a href='#' className='underline'> Reset Password </a></span>
                                </div>
                            </div>

                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3 space-x-2">
                                    <Link to="/#">
                                        <button className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                                            Back
                                        </button>
                                    </Link>

                                    <Link to="/cusomer/CustomerHome">
                                        <button className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="button">
                                            Login
                                        </button>
                                    </Link>
                                </div>
                                <div className="md:w-2/3"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}