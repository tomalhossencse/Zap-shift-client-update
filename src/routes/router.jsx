import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Home/Auth/Register/Register";
import Login from "../Pages/Home/Auth/Login/Login";
import Rider from "../Pages/rider/rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentSuccess from "../Pages/Dashboard/Payment/paymentSuccess";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/beARider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            {" "}
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "approve-riders",
        Component: ApproveRiders,
      },
    ],
  },
]);
