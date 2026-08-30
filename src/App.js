import './App.css';
import { Routes, Route } from "react-router-dom";
import Hompage from './Pages/Hompage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Pagenotfound from './Pages/Pagenotfound';
import Policy from './Pages/Policy';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import AdminLogin from './Pages/Auth/AdminLogin';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Dashboard from './Pages/user/Dashboard';
import AdminRoute from './component/Layout/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Orders from './Pages/user/Orders';
import Profile from './Pages/user/Profile';
import PrivateRoute from './component/Layout/Routes/PrivateRoute';
import Createcategory from './Pages/Admin/Createcategory';
import Createproduct from './Pages/Admin/Createproduct';
import CreateAdmin from './Pages/Admin/CreateAdmin';
import Products from './Pages/Admin/Products';
import Updateproduct from './Pages/Admin/Updateproduct';
import Searchx from './Pages/Searchx';
import Productdetail from './Pages/Productdetail';
import Categories from './Pages/user/Categories';
import Categoryproduct from './Pages/user/Categoryproduct';
import Cartpage from './Cartpage';
import AdminOrders from './Pages/Admin/AdminOrders';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hompage />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/category/:slug" element={<Categoryproduct />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product/:slug" element={<Productdetail />} />
      <Route path="/search" element={<Searchx />} />

      {/* User Protected Routes */}
      <Route path="/dashboard/user" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route path="/dashboard/admin" element={<AdminRoute />}>
        <Route path="" element={<AdminDashboard />} />
        <Route path="create-category" element={<Createcategory />} />
        <Route path="create-product" element={<Createproduct />} />
        <Route path="create-admin" element={<CreateAdmin />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:slug" element={<Updateproduct />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;
