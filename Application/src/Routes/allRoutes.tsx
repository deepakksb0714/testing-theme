import { Navigate } from "react-router-dom";

// Dashboard

import Dashboard from "../pages/Dashboard/Index";
import Signin from "../pages/AuthenticationInner/Signin";
import Signup from "../pages/AuthenticationInner/Signup";
import PasswordReset from "../pages/AuthenticationInner/PasswordReset";
import Lockscreen from "../pages/AuthenticationInner/Lockscreen";

import AddInvoice from "../pages/InvoiceManagement/AddInvoice/index";
import InvoiceDetails from "../pages/InvoiceManagement/InvoiceDetails/index";
import AddProduct from "../pages/InvoiceManagement/AddProduct";
import NewTransaction from "../pages/InvoiceManagement/NewTransaction/index";
import TransactionList from "../pages/InvoiceManagement/TransactionList/index";
import Taxes from "../pages/InvoiceManagement/Taxes/index";
import SalesReport from "../pages/InvoiceManagement/Report/SalesReport/index";
import ExpensesReport from "../pages/InvoiceManagement/Report/ExpensesReport/index";
import Invoice from "../pages/InvoiceManagement/Invoice/index";
import PaymentSummary from "../pages/InvoiceManagement/Report/PaymentSummary";
import Users from "../pages/InvoiceManagement/Users";
import ProductList from "../pages/InvoiceManagement/ProductList";
import Payments from "../pages/InvoiceManagement/Payments";

import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import Register from "../pages/Authentication/Register";
import UserProfile from "../pages/Authentication/UserProfile";


interface RouteObject {
  path: string;
  component: any;
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/index", component: <Dashboard /> },
  { path: "/dashboard", component: <Dashboard /> },

  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  { path: "*", component: <Navigate to="/dashboard" /> },

  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  { path: "*", component: <Navigate to="/dashboard" /> },

  { path: "/invoice", component: <Invoice /> },
  { path: "/invoice-add", component: <AddInvoice /> },
  { path: "/payment-summary", component: <PaymentSummary /> },
  { path: "/invoice-details", component: <InvoiceDetails /> },
  { path: "/product-add", component: <AddProduct /> },
  { path: "/transaction-new", component: <NewTransaction /> },
  { path: "/transaction-list", component: <TransactionList /> },
  { path: "/taxes", component: <Taxes /> },
  { path: "/sale-report", component: <SalesReport /> },
  { path: "/expenses-report", component: <ExpensesReport /> },
  { path: "/user", component: <Users /> },
  { path: "/product-list", component: <ProductList /> },
  { path: "/payments", component: <Payments /> },
  

   

   //  Profile
   { path: "/user-profile", component: <UserProfile/>},

];

const publicRoutes: Array<RouteObject> = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <Register /> },
  
  { path: "/auth-signin",  component: <Signin /> },
  { path: "/auth-signup",  component: <Signup /> },
  { path: "/auth-pass-reset",  component: <PasswordReset /> },
  { path: "/auth-lockscreen",  component: <Lockscreen /> },

];

export { authProtectedRoutes, publicRoutes}