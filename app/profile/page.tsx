"use client";

import AuthForm from "@/components/layout/authForm";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import AppWrapper from "../AppWrapper";
import Profile from "./components/profile";
import SideDashboard from "./components/sideDashboard";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
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
