import React from 'react'
import ProductList from './pages/ProductList'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import SingleProduct from "./pages/SingleProduct";
import SingleChat from './pages/SingleChat';
import Chats from './pages/Chats';

//upload
//temp
import AddImage from './components/AddImage';

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
    path:"/products/:category",
    element : <ProductList/>
  },
  {
    path: "/product/:id",
    element: <SingleProduct />,
  },
  {
    path:"/chats",
    element:<Chats/>,
  },
  {
    path: "/chats/:id",
    element: <SingleChat />,
  },
  {
    path: "/upload",
    element: <AddImage/>
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
}
