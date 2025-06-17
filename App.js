import Navbar from "./components/navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/userContext"; // adjust path if needed

// import pages
import Home from "./pages/home";
import Courses from "./pages/courses";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import UserId from "./pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Courses />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/courses",
    element: (
      <>
        <Navbar />
        <Courses />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/user",
    element: (
      <>
        <Navbar />
        <UserId />
      </>
    ),
  },
]);

const App = () => {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};

export default App;
