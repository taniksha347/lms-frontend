import React, {  useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg,setLoginMsg] = useState(false)
  const [error, setError] = useState("");
  const {setUser, setLoginUser} = useContext(UserContext);

  const navigate = useNavigate(); // For navigation after successful login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("https://lms-course-data.onrender.com/login", { // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password}),
      });

      const data = await response.json();
      
      if (response.ok) {
        // If login is successful, you can store the token in local storage or cookies
        localStorage.setItem("token", data.token); // Save token
        localStorage.setItem("email", email.trim().toLowerCase()); // ✅ Save email
        // Show welcome message
        setLoginMsg(true)
        setUser(true)
        setLoginUser(data.findExistUser.name)

        
        setTimeout(() => {
          navigate("/"); // Redirect to home or dashboard
        }, 2000);
      } else {
        setError(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-300 w-full h-full pb-[100px] flex justify-center pt-[170px]">
      <form onSubmit={handleSubmit} className="bg-white h-[530px] shadow pt-[40px] p-[60px] rounded-md">
        <h2 className="text-4xl font-bold mb-4 text-center">Welcome Back</h2>
        <h2 className="text-1xl tracking-wide text-gray-500 mb-[30px] text-center">
          Please login to your account
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
        {loginMsg && <p className="text-green-400 font-semibold text-center">Login Successfull</p>}

        {/* Input boxes */}
        <div className="space-y-[20px]">
          <div>
            <label className="text-gray-600 text-xl font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="border mt-2 rounded w-full py-2 px-3"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-xl font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="border mt-2 rounded w-full py-2 px-3"
              required
            />
          </div>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="bg-blue-500 text-white text-xl font-semibold py-2 px-4 rounded-md w-full mt-[20px]"
        
        >
          Login
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="px-4 text-gray-600 font-medium">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <h2 className="text-gray-500 pt-4 text-center text-xl ">
          Don't have an account?
          <Link to="/signup">
            <span className="text-blue-500 font-semibold hover:underline"> Sign up</span>
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default Login;