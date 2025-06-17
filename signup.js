import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation after successful signup

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("https://lms-course-data.onrender.com/signup", { // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password,role}),
      });
     
      const data = await response.json();
      console.log("Submitting:", {name,email,password,role});

      if (response.ok) {
        alert("Signup successful!"); // Show success message
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.message); // Show error message
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-300 w-full h-full pb-[100px] flex justify-center pt-[170px]">
      <form onSubmit={handleSubmit} className="bg-white h-[640px] shadow pt-[40px] p-[60px] rounded-md">
        <h2 className="text-4xl font-bold mb-4 text-center">Create your Account</h2>
        <h2 className="text-1xl tracking-wide text-gray-500 mb-[30px] text-center">
          Join us today. it's quick and easy!
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}        
        {/* Input boxes */}
        <div className="space-y-[20px]">
          <div>
            <label className="text-gray-600 text-xl font-semibold">Username</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update username state
              className="border mt-2 rounded w-full py-2 px-3"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-xl font-semibold">Email Address</label>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="border mt-2 rounded w-full py-2 px-3"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 text-xl font-semibold block mb-2">Role</label>
            <label className="mr-4 text-lg">
              <input
                className="w-4 h-4"
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)} // Update role state
              />{" "}
              Student
            </label>
            <label className="text-lg">
              <input
                className="w-4 h-4"
                type="radio"
                name="role"
                value="instructor"
                checked={role === "instructor"}
                onChange={(e) => setRole(e.target.value)} // Update role state
              />{" "}
              Instructor
            </label>
          </div>
        </div>

        {/* Signup button */}
        <button
          type="submit"
          className="bg-blue-500 text-white text-xl font-semibold py -2 px-4 rounded-md w-full mt-[20px]"
        >
          Sign Up
        </button>
        <h2 className="text-gray-500 pt-4 text-center text-xl">
          Already have an account? 
          <Link to="/login">
            <span className="text-blue-500 font-semibold hover:underline">Log in</span>
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default Signup;
