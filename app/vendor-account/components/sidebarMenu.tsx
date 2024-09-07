"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBox, FaCog, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

const SidebarMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/vendor-account", icon: FaTachometerAlt, label: "Dashboard" },
    {
      href: "/vendor-account/products",
      icon: FaBox,
      label: "Products",
      count: 300,
    },
    {
      href: "/vendor-account/add-products",
      icon: MdOutlineFileUpload,
      label: "Add New Products",
    },
    {
      href: "/vendor-account/orders",
      icon: FaShoppingCart,
      label: "Orders",
      count: 40,
    },
    {
      href: "/vendor-account/settings",
      icon: FaCog,
      label: "Account Settings",
    },
  ];

  return (
    <div className="rounded-md bg-white p-4 shadow-lg">
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mb-4 flex items-center ${
              pathname === item.href ? "text-rose-500" : "text-gray-600"
            } transition-colors duration-200 hover:text-rose-500`}
          >
            <item.icon size={20} className="mr-2" />
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span className=" ml-2 text-gray-400">{item.count}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SidebarMenu;
