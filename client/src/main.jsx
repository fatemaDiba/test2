import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./Components/Users.jsx";
import UpdateUser from "./Components/UpdateUser.jsx";
import LogIn from "./Components/LogIn.jsx";
import Register from "./Components/Register.jsx";
import AuthProvider from "./AuthContext/AuthProvider.jsx";
import UserCollection from "./Components/UserCollection.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/users",
    element: <Users></Users>,
    loader: () => fetch("https://express-five-khaki.vercel.app/users"),
  },
  {
    path: "/updateUser/:id",
    element: <UpdateUser></UpdateUser>,
    loader: ({ params }) => fetch(`https://express-five-khaki.vercel.app/users/${params.id}`),
  },
  {
    path: "/login",
    element: <LogIn></LogIn>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/userCollection",
    element: <UserCollection></UserCollection>,
    loader: () => fetch("https://express-five-khaki.vercel.app/users2"),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
