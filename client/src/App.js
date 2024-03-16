import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/layout/Root";

const HomePage = lazy(() => import("./pages/home/Home"));
const ShopPage = lazy(() => import("./pages/shop/Shop"));
const DetailPage = lazy(() => import("./pages/detail/Detail"));
const CartPage = lazy(() => import("./pages/Cart/Cart"));
const CheckoutPage = lazy(() => import("./pages/checkout/Checkout"));
const LoginPage = lazy(() => import("./pages/Login/Login"));
const RegisterPage = lazy(() => import("./pages/Register/Register"));
const History = lazy(() => import("./pages/history/History"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      {
        path: "detail/:productId",
        element: <DetailPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
function App() {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
