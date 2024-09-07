"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
import {
  FaAddressCard,
  FaCreditCard,
  FaHeadset,
  FaHeart,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

const SideDashboard = () => {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      {/* Dashboard Section */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
        <div className="space-y-4">
          <Link
            href="/profile/orders"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile/orders"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaShoppingCart />
            <span>Orders</span>
          </Link>
          <Link
            href="/profile/wishlist"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile/wishlist"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaHeart />
            <span>Wishlist</span>
          </Link>
          <Link
            href="/profile/support-tickets"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile/support-tickets"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaHeadset />
            <span>Support Tickets</span>
          </Link>
        </div>
      </div>

      {/* Account Settings Section */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Account Settings</h2>
        <div className="space-y-4">
          <Link
            href="/profile"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile" ? "font-semibold text-rose-500" : ""
            }`}
          >
            <FaUser
              className={`${pathname === "/profile" ? "text-rose-500" : ""}`}
            />
            <span>Profile Info</span>
          </Link>
          <Link
            href="/profile/address"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile/address"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaAddressCard />
            <span>Address</span>
          </Link>
          <Link
            href="/profile/payment-methods"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile/payment-methods"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaCreditCard />
            <span>Payment Methods</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideDashboard;
