import { useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      
      const loginData = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      };
  
      try {
        const response = await axios.post("http://127.0.0.1:8000/AdminDashboard/api/login/", loginData);
        console.log("Login successful:", response.data);
        localStorage.setItem('userdata',JSON.stringify(response.data))
        navigate('/')
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  ref={usernameRef}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
              Dont have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
export default Login;