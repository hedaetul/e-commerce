// src/pages/profile.tsx
"use client";

import AuthForm from "@/components/layout/authForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppWrapper from "../AppWrapper";
import Profile from "./components/profile";
import SideDashboard from "./components/sideDashboard";

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

  const orders = [
    { id: "12345", date: "2024-08-01", total: 99.99, status: "Shipped" },
    { id: "67890", date: "2024-07-15", total: 49.99, status: "Delivered" },
    { id: "54321", date: "2024-06-10", total: 19.99, status: "Pending" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppWrapper>
      <section className="bg-[#F6F6F6]">
        <div className="container mx-auto grid grid-cols-4 gap-4 px-4 py-8">
          <div className="col-span-1">
            <SideDashboard />
          </div>
          <div className="col-span-3">
            <Profile />
          </div>
        </div>
      </section>
    </AppWrapper>
  );
};

export default ProfilePage;
