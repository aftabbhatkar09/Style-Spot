import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store";
import CartScreen from "@screens/Cart";
import HomeScreen from "@screens/Home";
import Layout from "@components/Layout";
import ErrorScreen from "@screens/Error";
import LoginScreen from "@screens/Login";
import OrderScreen from "@screens/Order";
import ShippingScreen from "@screens/Shipping";
import RegisterScreen from "@screens/Register";
import PaymentScreen from "@screens/PaymentScreen";
import PlaceOrderScreen from "@screens/PlaceOrder";
import PrivateRoute from "@components/PrivateRoute";
import ProductDetails from "@screens/ProductDeatils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },

      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "/shipping",
            element: <ShippingScreen />,
          },
          {
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            path: "/placeorder",
            element: <PlaceOrderScreen />,
          },
          {
            path: "/order/:id",
            element: <OrderScreen />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        autoClose={5000}
      />
    </Provider>
  );
}

export default App;

// 52 out of 77
