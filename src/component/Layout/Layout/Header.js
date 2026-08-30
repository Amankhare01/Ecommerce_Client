import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useAuth } from '../../../Pages/context/Auth';
import toast from 'react-hot-toast';
import Usecategory from '../../../Hooks/Usecategory';
import { useCart } from '../../../Pages/context/Cart';
import Searchinput from '../form/Searchinput';

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = Usecategory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handlelogout = () => {
    setAuth({
      ...auth,
      users: null,
      token: '',
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    setUserDropdown(false);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-600 hover:text-primary-700 transition-colors">
            <FaCartShopping className="w-6 h-6 text-primary-600" />
            <span>Ecommerce</span>
          </NavLink>

          {/* Search bar on desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
            <Searchinput />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary-600 font-semibold" : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary-600 font-semibold" : "text-neutral-600 hover:text-neutral-900"
                }`
              }
            >
              About
            </NavLink>

            {/* Category Dropdown */}
            <div className="relative" onMouseLeave={() => setCatDropdown(false)}>
              <button
                onClick={() => setCatDropdown(!catDropdown)}
                onMouseEnter={() => setCatDropdown(true)}
                className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 py-2 transition-colors"
              >
                Category
                <FiChevronDown className={`w-4 h-4 transition-transform ${catDropdown ? 'rotate-180' : ''}`} />
              </button>

              {catDropdown && (
                <div className="absolute top-full left-0 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <NavLink
                    to="/categories"
                    onClick={() => setCatDropdown(false)}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 font-semibold border-b border-neutral-100"
                  >
                    All Categories
                  </NavLink>
                  {categories?.map((c) => (
                    <NavLink
                      key={c._id}
                      to={`/category/${c.slug}`}
                      onClick={() => setCatDropdown(false)}
                      className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600 transition-colors"
                    >
                      {c.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Auth / User Navigation */}
            {!auth?.users ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-1.5 rounded-lg shadow-sm transition-colors"
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <div className="relative" onMouseLeave={() => setUserDropdown(false)}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  onMouseEnter={() => setUserDropdown(true)}
                  className="flex items-center gap-1 text-sm font-semibold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  {auth?.users?.name}
                  <FiChevronDown className={`w-4 h-4 transition-transform ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {userDropdown && (
                  <div className="absolute top-full right-0 w-52 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <NavLink
                      to={`/dashboard/${auth?.users?.role === 1 ? 'admin' : 'user'}`}
                      onClick={() => setUserDropdown(false)}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 font-semibold border-b border-neutral-100"
                    >
                      Dashboard
                    </NavLink>

                    {auth?.users?.role === 1 ? (
                      <>
                        <NavLink
                          to="/dashboard/admin/products"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
                        >
                          Products
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/create-category"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
                        >
                          Create Category
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/create-product"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
                        >
                          Create Product
                        </NavLink>
                        <NavLink
                          to="/dashboard/admin/orders"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
                        >
                          Orders
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/dashboard/user/profile"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
                        >
                          Profile
                        </NavLink>
                        <NavLink
                          to="/dashboard/user/orders"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-primary-600"
                        >
                          Orders
                        </NavLink>
                      </>
                    )}

                    <div className="border-t border-neutral-100 my-1"></div>
                    <button
                      onClick={handlelogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Cart Link with Badge */}
            <NavLink to="/cart" className="relative flex items-center p-2 text-neutral-600 hover:text-primary-600 transition-colors">
              <FaCartShopping className="w-5 h-5" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <NavLink to="/cart" className="relative p-2 text-neutral-600">
              <FaCartShopping className="w-5 h-5" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </NavLink>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="pb-2">
            <Searchinput />
          </div>

          <div className="flex flex-col space-y-2">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              About
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              All Categories
            </NavLink>

            {auth?.users ? (
              <>
                <NavLink
                  to={`/dashboard/${auth?.users?.role === 1 ? 'admin' : 'user'}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-primary-700 bg-primary-50"
                >
                  Dashboard ({auth?.users?.name})
                </NavLink>
                <button
                  onClick={handlelogout}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-neutral-700 border border-neutral-300 rounded-lg"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium text-white bg-primary-600 rounded-lg"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;