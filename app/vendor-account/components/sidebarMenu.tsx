import { FaBox, FaCog, FaShoppingCart, FaTachometerAlt } from "react-icons/fa";

const SidebarMenu = () => {
  return (
    <div className="rounded-md bg-white p-4 shadow-lg">
      <div className="mb-8">
        <button className="mb-4 flex items-center text-red-500">
          <FaTachometerAlt size={20} className="mr-2" />
          <span>Dashboard</span>
        </button>
      </div>
      <div>
        <button className="mb-4 flex items-center text-gray-600">
          <FaBox size={20} className="mr-2" />
          <span>Products</span>
          <span className="ml-auto text-gray-400">300</span>
        </button>
        <button className="mb-4 flex items-center text-gray-600">
          <FaShoppingCart size={20} className="mr-2" />
          <span>Orders</span>
          <span className="ml-auto text-gray-400">40</span>
        </button>
        <button className="mb-4 flex items-center text-gray-600">
          <FaCog size={20} className="mr-2" />
          <span>Account Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;