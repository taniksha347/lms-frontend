import { CameraIcon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
    // const [currentUser, setCurrentUser] = useState(null); // 👈 new state
const [activeUser, setActiveUser] = useState(null);

  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://lms-course-data.onrender.com/allusers"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);

        // ✅ Get and normalize stored email
        const storedEmail = localStorage.getItem("email")?.trim().toLowerCase();
        console.log("🧪 Stored Email:", storedEmail);
        console.log("👥 All users fetched:", data.map((u) => u.email));

        // ✅ Match current user
        if (storedEmail) {
          const current = data.find(
            (u) => u.email?.trim().toLowerCase() === storedEmail
          );
          console.log("🔍 Matched user:", current);

          if (current) {
            setActiveUser(current);
            console.log("✅ Active user set:", current);
          } else {
            console.log("⚠️ No user found matching email:", storedEmail);
          }
        } else {
          console.log("⚠️ No email found in localStorage");
        }
      
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-30">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center mt-30 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-300 p-6 pt-[200px]">
      <h1 className="text-3xl font-bold text-center mb-8">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          <div
          
            className="bg-white  p-6 rounded-2xl shadow-inner shadow-black "
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => console.log(e.target.files[0])}
            />
            <div
              onClick={handleClick}
              className="h-[140px] w-[140px] rounded-full bg-slate-600 outline-dashed outline-black outline-offset-2 outline-[3px] shadow-black shadow-inner flex text-center justify-center items-center"
            >
              <CameraIcon className="text-white h-[40px] w-[40px]" />
            </div>
            <div className="w-[360px] h-[3px] m-6 bg-slate-300"></div>
            <h2 className="w-[220px] m-2 tracking-wide font-semibold text-2xl font-serif border p-2 rounded-2xl inline-block">
              UserName{" "}
              <span className="text-black font-bold text-[30px]">:-</span>
            </h2>
            <p className=" text-xl font-medium tracking-wide text-gray-600 font-mono capitalize  inline-block ">
              {activeUser.name}
            </p>{" "}
            <br />
            <h2 className="w-[220px] m-2 tracking-wide font-semibold text-2xl font-serif border p-2 rounded-2xl inline-block">
              Email <span className="text-black font-bold text-[30px]">:-</span>
            </h2>
            <p className=" text-xl font-medium tracking-wide text-gray-600 font-mono inline-block ">
              {activeUser.email}
            </p>
            <br />
            <h2 className="w-[220px] m-2 tracking-wide font-semibold text-2xl font-serif border p-2 rounded-2xl inline-block">
              Role <span className="text-black font-bold text-[30px]">:-</span>
            </h2>
            <p className=" text-xl font-medium tracking-wide text-gray-600 font-mono capitalize  inline-block ">
              {activeUser.role}
            </p>{" "}
            <br />
          </div>
      
      </div>
    </div>
  );
};

export default UserList;
