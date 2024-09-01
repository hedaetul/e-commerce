"use client";

import Spinner from "@/components/custom/spinner";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import ProfileWrapper from "../ProfileWrapper";

const Wishlist = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProfileWrapper>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <FaHeart className="mr-2 text-2xl text-red-500" />
          <h1 className="text-2xl font-bold">Wishlist</h1>
        </div>
        <div className="mx-auto w-full rounded-lg">
          {loading ? (
            <Spinner />
          ) : (
            <h1 className=" text-xl text-rose-400">
              You have no item in your wishlist. Your wishlist items will appear
              here...
            </h1>
          )}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default Wishlist;
