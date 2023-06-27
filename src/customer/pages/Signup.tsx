import { useState, useRef, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const FormAutofill: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>('');
  const [showModal, setShowModal] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
        console.log(JSON.stringify(formData))
        const response = await fetch(`${BASE_URL}/customer/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            const token = await response.text();
            localStorage.setItem("customerAuthSignUpToken", token);
            navigate('/customer/login');
        }
    } catch(error) {
        console.error("Login failed");
        console.error(error);
        setError("Sign up failed: " + error);
    }
};

useEffect(() => {
  let timeoutId:any = null;

  if (error) {
    timeoutId = setTimeout(() => {
      setError(null);
    }, 1000);
  }

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}, [error]);

  const hideModel = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <section className="fixed z-10 inset-0 overflow-y-hidden">
          <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
             
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >

              <div className="bg-white px-20 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col sm:items-start">
                  <h2 className="mb-2 text-lg text-center  font-medium text-gray-700">Terms and Agreement</h2>

                  <p className="mb-4 text-sm text-gray-600">
                    Consent: By agreeing to give personal details , you are giving your consent for the processing of personal data. It is important to note that this consent can be withdrawn at any time.
                  </p>
                
                </div>

                <div className="flex flex-row items-center justify-evenly">
                    <button onClick={hideModel} className="px-4 py-2 bg-slate-900 rounded-md text-white hover:bg-gray-700">
                      Yes
                    </button>
                    <Link to="/">
                      <button onClick={hideModel} className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-700">
                        No
                      </button>
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </section>

        )}    

      {error && (
        <div className="bg-red-500 text-white py-4 px-6 mx-3 mt-2 rounded-lg" role="alert">
            <strong className="font-medium">Error: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex h-screen  bg-gradient-to-r from-pink-200 to-gray-100">
        
        <div className="w-3/4 flex items-center justify-center h-screen">
          <form method="post" onSubmit={handleSignup} className="w-3/4 space-y-4 bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 flex flex-col my-2">
            
            <div className="flex space-x-4">
              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Full Name
                <input
                  type="text"
                  onChange={handleChange}
                  name="fullName"
                  placeholder="Type here"
  
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>  

              <label className="w-1/2 block text-gray-700 text-sm font-bold">
                Email
                <input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  placeholder="Type here"
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>

            </div>

            <div className="flex space-x-4 ">
             <label className="w-1/2 block text-gray-700 text-sm font-bold ">
                Password
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  placeholder="Type here"
                  
                  className="mt-1 p-2 block w-full rounded-md bg-gray-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>
              
            </div>

            <div className="flex items-center pt-5">
              <div className="md:w-3/4 space-x-4 ">
                  <Link to="/#">
                      <button className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                          Back
                      </button>
                  </Link>

                  
                    <button onClick={handleSignup} className="shadow bg-sky-400 hover:bg-sky-600 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                        SignUp
                    </button>
                  
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
                
export default FormAutofill;
