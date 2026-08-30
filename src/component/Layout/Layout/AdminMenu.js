import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiFolderPlus, FiPlusCircle, FiShoppingBag, FiList, FiUserPlus } from "react-icons/fi";

const AdminMenu = () => {
  const links = [
    { to: "/dashboard/admin", label: "Dashboard", icon: FiGrid, end: true },
    { to: "/dashboard/admin/create-category", label: "Create Category", icon: FiFolderPlus },
    { to: "/dashboard/admin/create-product", label: "Create Product", icon: FiPlusCircle },
    { to: "/dashboard/admin/products", label: "Products List", icon: FiList },
    { to: "/dashboard/admin/orders", label: "Manage Orders", icon: FiShoppingBag },
    { to: "/dashboard/admin/create-admin", label: "Create Admin", icon: FiUserPlus },
  ];

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-3 shadow-sm mb-6 md:mb-0">
      <h3 className="hidden md:block text-xs font-bold uppercase tracking-wider text-neutral-400 px-3 py-2">
        Admin Controls
      </h3>
      <nav className="flex md:flex-col overflow-x-auto gap-1 pb-1 md:pb-0">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminMenu;
