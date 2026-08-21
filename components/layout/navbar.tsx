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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FaRegUser, FaShoppingCart, FaTruck } from "react-icons/fa";
import { MdCategory, MdOutlineLocalGroceryStore } from "react-icons/md";
import AuthForm from "./authForm";
import BrandMark from "./brand";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "/", text: "Home", icon: <AiOutlineHome /> },
  { href: "/profile", text: "User Account", icon: <FaRegUser /> },
  { href: "/vendor-account", text: "Vendor Account", icon: <FaRegUser /> },
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
    <div className="w-screen bg-background text-foreground shadow-lg">
      <div className="container flex flex-col justify-between">
        <div className="relative flex h-[5rem] items-center justify-between gap-5">
          <BrandMark />

          {/* Search bar and user icon for larger screens */}
          <div className="relative w-[40%] sm:w-1/2 md:ml-4 md:block md:w-[660px]">
            <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 transform text-lg text-muted-foreground" />
            <input
              type="text"
              className="h-[44px] w-full rounded-full border border-border bg-card pl-12 pr-5 text-foreground outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
              placeholder="Search"
            />
          </div>
          {/* Cart icon visible on small screens */}
          <div className="ml-4 flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link
              href="/carts"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent"
            >
              <MdOutlineLocalGroceryStore className="text-lg" />
              {cartItemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <span
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondary hover:bg-accent"
              onClick={handleUserIconClick}
            >
              <FaRegUser className="text-lg" />
            </span>
            <Link
              href="/carts"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-accent"
            >
              <MdOutlineLocalGroceryStore className="text-lg" />
              {cartItemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="hidden h-[3.75rem] items-center justify-between md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center rounded px-4 py-1 hover:bg-secondary">
                <MdCategory className="mr-2 text-lg" />
                <p className="text-muted-foreground hover:text-foreground">Category</p>
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
                className="text-muted-foreground hover:text-primary"
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
      <div className="shadow-btm fixed bottom-0 left-0 right-0 z-10 flex items-center justify-around border-t border-border bg-background p-2 md:hidden">
        <Link href="/" className="text-muted-foreground hover:text-primary">
          <AiOutlineHome className="text-2xl" />
        </Link>
        <Link href="/profile" className="text-muted-foreground hover:text-primary">
          <FaRegUser className="text-2xl" />
        </Link>
        {/* Cart icon moved up, not repeated here */}
        <Link href="#" className="text-muted-foreground hover:text-primary">
          <FaTruck className="text-2xl" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-primary">
          <FaShoppingCart className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
