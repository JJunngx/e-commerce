import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/Navigation";
import { AuthProvider } from "./context/AuthContext";
const Products = lazy(() => import("./components/Products"));

const CreateProduct = lazy(() => import("./components/CreateProduct"));
const Chat = lazy(() => import("./components/Chat"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const EditProduct = lazy(() => import("./components/EditProduct"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      { path: "dashboard", element: <Dashboard /> },

      { path: "createProduct", element: <CreateProduct /> },
      { path: "editProduct/:editProductId", element: <EditProduct /> },
      { path: "chat", element: <Chat /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
function App() {
  return (
    <AuthProvider>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
