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
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      {/* Dashboard Section */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
        <div className="space-y-2">
          <Link
            href="/orders"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/orders" ? "font-semibold text-rose-500" : ""
            }`}
          >
            <FaShoppingCart
              className={`${
                pathname === "/orders" ? "text-rose-500" : ""
              }`}
            />
            <span>Orders</span>
          </Link>
          <Link
            href="/wishlist"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/wishlist" ? "font-semibold text-rose-500" : ""
            }`}
          >
            <FaHeart
              className={`${
                pathname === "/wishlist" ? "text-rose-500" : ""
              }`}
            />
            <span>Wishlist</span>
          </Link>
          <Link
            href="/support-tickets"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/support-tickets"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaHeadset
              className={`${
                pathname === "/support-tickets"
                  ? "text-rose-500"
                  : ""
              }`}
            />
            <span>Support Tickets</span>
          </Link>
        </div>
      </div>

      {/* Account Settings Section */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Account Settings</h2>
        <div className="space-y-2">
          <Link
            href="/profile"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/profile" ? "font-semibold text-rose-500" : ""
            }`}
          >
            <FaUser
              className={`${
                pathname === "/profile" ? "text-rose-500" : ""
              }`}
            />
            <span>Profile Info</span>
          </Link>
          <Link
            href="/address"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/address" ? "font-semibold text-rose-500" : ""
            }`}
          >
            <FaAddressCard
              className={`${
                pathname === "/address" ? "text-rose-500" : ""
              }`}
            />
            <span>Address</span>
          </Link>
          <Link
            href="/payment-methods"
            className={`flex items-center space-x-2 text-gray-700 hover:text-rose-500 ${
              pathname === "/payment-methods"
                ? "font-semibold text-rose-500"
                : ""
            }`}
          >
            <FaCreditCard
              className={`${
                pathname === "/payment-methods"
                  ? "text-rose-500"
                  : ""
              }`}
            />
            <span>Payment Methods</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideDashboard;
