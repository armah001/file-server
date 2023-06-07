import React, {useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

export default function AdminSignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] =  useState({});
    const [error, setError] = useState<string | null>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {error && (
                <div className="bg-red-500 text-white py-4 px-6 mx-3 mt-2 rounded-lg" role="alert">
                    <strong className="font-medium">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="isolate hero min-h-screen w-screen bg-gradient-to-r from-pink-200 to-gray-100">
                <div className="overflow-hidden flex items-center justify-center" >
                    <form  method="post" > 
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Fullname
                                    </label>
                                    <input name="fullName" type="text" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Email
                                    </label>
                                    <input name="email" type="text" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                </div>
                        
                            </div>                         

                            <div className="-mx-3 md:flex">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                        Password
                                    </label>
                                    <input type="password" name="password" onChange={handleChange}  placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    <p className="text-grey-dark text-xs italic">Please use a secure password</p>
                                    <span className='text-black text-xs font-medium'>Already have an account?  <a href='/admin/login' className='underline'> Log In</a></span>
                                </div>
                            </div>
                
                            <br></br>
                            <div className="flex items-center pt-5">
                                    <div className="md:w-3/4 space-x-4 ">
                                        <Link to="/#">
                                            <button className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                                                Back
                                            </button>
                                        </Link>

                                        <Link to="/admin/login"> 
                                            <button className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                                                SignUp
                                            </button>
                                        </Link>
                                    </div>
                                    </div>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
    )
}