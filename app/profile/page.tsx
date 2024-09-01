"use client";

import Spinner from "@/components/custom/spinner";
import AuthForm from "@/components/layout/authForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { fetchOrdersAndCount, getPersonalDetails } from "@/lib/firebaseUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import ProfileWrapper from "../ProfileWrapper";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleAuthClose = () => {
    setShowAuthForm(false);
    setErrorMessage("");
  };

  const [personalDetails, setPersonalDetails] = useState<any>(null);
  const [orderCount, setOrderCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const details = await getPersonalDetails();
        setPersonalDetails(details);
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
      await Promise.all([fetchPersonalDetails(), fetchOrderCount()]);
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
      <div >
        <div className="mx-auto  rounded-lg p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <FaUser className="mr-2 text-2xl text-red-500" />
              <h1 className="text-2xl font-bold">My Profile</h1>
            </div>
            <button className="rounded-lg bg-rose-200 px-4 py-2 text-rose-600 hover:bg-rose-500 hover:text-white">
              Edit profile
            </button>
          </div>

          <div className="mb-6 flex items-center rounded-lg bg-gray-50 p-4">
            <Image
              width="100"
              height="100"
              src={personalDetails?.photoUrl || <FaUser />}
              alt="User"
              className="mr-4 h-20 w-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {personalDetails?.name || "Name not found"}
              </h2>
              <p className="text-gray-500">SILVER USER</p>
              <p className="text-red-500">Balance: $500</p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <h3 className="text-2xl font-bold text-red-500">{orderCount}</h3>
              <p className="text-gray-500">All Orders</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <h3 className="text-2xl font-bold text-red-500">02</h3>
              <p className="text-gray-500">Awaiting Payments</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <h3 className="text-2xl font-bold text-red-500">00</h3>
              <p className="text-gray-500">Awaiting Shipment</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow">
              <h3 className="text-2xl font-bold text-red-500">01</h3>
              <p className="text-gray-500">Awaiting Delivery</p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="text-lg">
                  {personalDetails?.name || "Not Available"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-lg">
                  {personalDetails?.email || "Not Available"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Login Method</p>
                <p className="text-lg">
                  {personalDetails?.loginMethod || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <div className="flex w-full justify-end pr-12">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </ProfileWrapper>
  );
};

export default ProfilePage;
