// src/pages/profile.tsx
"use client";

import AuthForm from "@/components/layout/authForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { useState } from "react";
import AppWrapper from "../AppWrapper";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleAuthClose = () => {
    setShowAuthForm(false);
    setErrorMessage("");
  };

  if (!user) {
    return (
      showAuthForm && (
        <AuthForm
          isLogin={isLogin}
          toggleLoginSignup={() => setIsLogin(!isLogin)}
          setError={setErrorMessage}
          onClose={handleAuthClose}
        />
      )
    );
  }

  const { displayName, email, photoURL } = user;

  // Dummy data for orders (replace with real data from your API)
  const orders = [
    { id: "12345", date: "2024-08-01", total: 99.99, status: "Shipped" },
    { id: "67890", date: "2024-07-15", total: 49.99, status: "Delivered" },
    { id: "54321", date: "2024-06-10", total: 19.99, status: "Pending" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24">
              <Image
                src={photoURL || "/default-user-icon.png"}
                alt={displayName || "User Profile"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-semibold">
                {displayName || "User"}
              </h1>
              <p className="text-gray-600">{email}</p>
              <div className="mt-4">
                <Link href="/edit-profile">
                  <div className="cursor-pointer text-blue-500 hover:underline">
                    Edit Profile
                  </div>
                </Link>
              </div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Previous Orders</h2>
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Order ID:</span>
                    <span>{order.id}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`font-medium ${
                        order.status === "Shipped"
                          ? "text-green-500"
                          : order.status === "Delivered"
                            ? "text-blue-500"
                            : "text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No previous orders found.</p>
            )}
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default ProfilePage;
