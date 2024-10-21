import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import Product from "../components/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/:id",
    element: <Product />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
