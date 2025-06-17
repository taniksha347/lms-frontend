import { GraduationCap, User } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {

    const {user , setUser , loginUser} = useContext(UserContext);
    console.log(loginUser);    

    const navigate = useNavigate()

    const logOutUser = () =>{
      localStorage.removeItem('token');
      navigate("/login")
      setUser(false)
    }

  return (
    <div className="bg-gray-900 h-[120px] w-full fixed top-0 flex z-50">
      {/* logo */}
      <Link to="/">
        <div className="p-6 flex">
          <GraduationCap className="text-green-400 h-[60px] w-[60px]" />
          <h1 className="text-white font-semibold text-3xl pl-6 pt-3 tracking-wider">
            Bright LMS
          </h1>
          
        </div>
      </Link>

      {/* navbar */}
      <nav className="absolute right-20 top-10">
        <ul className="flex space-x-[20px] text-white text-xl">
          <Link to="/">
            <li className="px-2 py-1">Home</li>{" "}
          </Link>
          <Link to="/courses">
            <li className="px-2 py-1">Courses</li>
          </Link>
          {!user ? (
            <div className="space-x-[20px]">
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-600 rounded-md px-2 py-1">
                  Login
                </button>{" "}
              </Link>
              <Link to="/signup">
                <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-x-[20px] flex">
              <Link to="/user">
                <div className="h-[40px] w-[60px] hover:bg-slate-700 flex justify-center items-center rounded-full border-4 border-slate-400 mr-2" title="User ID" >
                    <User className="text-white "/>
                    <p className="text-white p-4">{loginUser}</p>
                </div>
              </Link>
              <button onClick={logOutUser} className="bg-red-600 hover:bg-red-900 rounded-md px-2 py-1">
                Logout
              </button>
              
              
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
