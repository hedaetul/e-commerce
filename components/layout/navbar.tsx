"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FaRegUser, FaShoppingCart, FaTruck } from "react-icons/fa";
import { MdCategory, MdOutlineLocalGroceryStore } from "react-icons/md";
import Bajar from "../../public/bajarsvg.svg";
import AuthForm from "./authForm";

const links = [
  { href: "/", text: "Home", icon: <AiOutlineHome /> },
  { href: "/profile", text: "User Account", icon: <FaRegUser /> },
  { href: "#", text: "Vendor Account", icon: <FaRegUser /> },
  { href: "#", text: "Track My Order", icon: <FaTruck /> },
  { href: "#", text: "Back to Demos", icon: <FaShoppingCart /> },
];

const Navbar: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  const { user } = useAuth();

  const toggleLoginSignup = () => {
    setIsLogin(!isLogin);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUserIconClick = () => {
    if (user) {
      router.push("/profile");
    } else {
      handleOpenDialog();
    }
  };

  return (
    <div className="w-screen shadow-lg">
      <div className="container flex flex-col justify-between">
        <div className="relative flex h-[5rem] items-center justify-between gap-5">
          <Link href="/" className="w-36 flex items-center">
            <Image src={Bajar} className="h-full w-full" alt="bajar" />
          </Link>

          {/* Search bar and user icon for larger screens */}
          <div className="relative w-[40%] sm:w-1/2 md:ml-4 md:block md:w-[660px]">
            <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 transform text-lg text-gray-400" />
            <input
              type="text"
              className="h-[44px] w-full rounded-full border border-gray-200 pl-12 pr-5 outline-none focus:border-blue-300"
              placeholder="Search"
            />
          </div>
          {/* Cart icon visible on small screens */}
          <Link
            href="/carts"
            className="relative ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 md:hidden"
          >
            <MdOutlineLocalGroceryStore className="text-lg" />
            {cartItemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          <div className="hidden gap-3 md:flex">
            <span
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
              onClick={handleUserIconClick}
            >
              <FaRegUser className="text-lg" />
            </span>
            <Link
              href="/carts"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200"
            >
              <MdOutlineLocalGroceryStore className="text-lg" />
              {cartItemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="hidden h-[3.75rem] items-center justify-between md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center rounded px-4 py-1 hover:bg-slate-100">
                <MdCategory className="mr-2 text-lg" />
                <p className="text-gray-600 hover:text-gray-900">Category</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category.id}>
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-5">
            {links.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={toggleLoginSignup}
          setError={handleError}
          onClose={handleCloseDialog}
        />
      )}

      {/* Sticky bottom navbar for small screens */}
      <div className="shadow-btm fixed bottom-0 left-0 right-0 z-10 flex items-center justify-around bg-white p-2 md:hidden">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          <AiOutlineHome className="text-2xl" />
        </Link>
        <Link href="/profile" className="text-gray-600 hover:text-gray-900">
          <FaRegUser className="text-2xl" />
        </Link>
        {/* Cart icon moved up, not repeated here */}
        <Link href="#" className="text-gray-600 hover:text-gray-900">
          <FaTruck className="text-2xl" />
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-900">
          <FaShoppingCart className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
