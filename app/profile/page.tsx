"use client";

import Spinner from "@/components/custom/spinner";
import AuthForm from "@/components/layout/authForm";
import { useAuth } from "@/context/AuthContext";
import {
  fetchOrdersAndCount,
  getPersonalInformation,
} from "@/lib/firebaseUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import ProfileWrapper from "../ProfileWrapper";
import EditableProfile from "./components/editableProfile";
import Profile from "./components/profile";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleAuthClose = () => {
    setShowAuthForm(false);
    setErrorMessage("");
  };

  const [personalInformation, setPersonalInformation] = useState<any>(null);
  const [orderCount, setOrderCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();

  const handleEdibility = () => {
    setIsEditable(!isEditable);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  useEffect(() => {
    const fetchPersonalInformation = async () => {
      try {
        const details = await getPersonalInformation();
        setPersonalInformation(details);
        setError(null);
      } catch (error) {
        setError("Failed to fetch personal details");
        console.log(error);
      }
    };

    const fetchOrderCount = async () => {
      try {
        const { numberOfOrders } = await fetchOrdersAndCount();
        setOrderCount(numberOfOrders);
        setError(null);
      } catch (error) {
        setError("Failed to count orders");
        console.log(error);
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPersonalInformation(), fetchOrderCount()]);
      setLoading(false);
    };

    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <ProfileWrapper>
        <Spinner />
      </ProfileWrapper>
    );
  }

  if (error) {
    return <div className="text-rose-600">Error: {error}</div>;
  }

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
    <ProfileWrapper>
      <div className="mx-auto rounded-lg p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaUser className="mr-2 text-2xl text-red-500" />
            <h1 className="text-2xl font-bold">
              {isEditable ? "Edit Profile" : "My Profile"}
            </h1>
          </div>
          <button
            onClick={handleEdibility}
            className="rounded-lg bg-rose-200 px-4 py-2 text-rose-600 hover:bg-rose-500 hover:text-white"
          >
            {isEditable ? "Back to profile" : "Edit profile"}
          </button>
        </div>
        {isEditable ? (
          <EditableProfile personalInformation={personalInformation} />
        ) : (
          <Profile
            orderCount={orderCount}
            personalInformation={personalInformation}
            handleLogout={handleLogout}
            user={user}
          />
        )}
      </div>
    </ProfileWrapper>
  );
};

export default ProfilePage;
