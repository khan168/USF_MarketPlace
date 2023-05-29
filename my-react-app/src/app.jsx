import React from 'react'
import ProductList from './pages/ProductList'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import SingleProduct from "./pages/SingleProduct";
import SingleChat from './pages/SingleChat';
import ForgotPass from './pages/ForgotPass';
import RedirectPass from './pages/RedirectPass';

//upload
//temp
import AddImage from './components/AddImage';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/products/:category",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <SingleProduct />,
  },
  {
    path: "/chats",
    element: <SingleChat />,
  },
  {
    path: "/upload",
    element: <AddImage />,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPass></ForgotPass>,
  },
  {
    path: "/forgot-password/:id/:token",
    element: <RedirectPass></RedirectPass>,
  },
  {
    path: "/favorites",
    element: <Favorites></Favorites>
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
}
