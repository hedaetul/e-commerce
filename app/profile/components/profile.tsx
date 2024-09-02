import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";

type ProfileProps = {
    personalInformation: any;
  orderCount: number;
  handleLogout: () => void;
  user: any;
};

const Profile: React.FC<ProfileProps> = ({
  personalInformation,
  orderCount,
  handleLogout,
  user,
}) => {
  return (
    <div>
      <div className="mb-6 flex items-center rounded-lg bg-gray-50 p-4 shadow">
        <Image
          width="100"
          height="100"
          src={personalInformation?.photoUrl || <FaUser />}
          alt="User"
          className="mr-4 h-20 w-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {personalInformation?.name || "Name not found"}
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

      <div className="rounded-lg bg-gray-50 p-4 shadow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-lg">
              {personalInformation?.name || "Not Available"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-lg">
              {personalInformation?.email || "Not Available"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Login Method</p>
            <p className="text-lg">
              {personalInformation?.loginMethod || "Not Available"}
            </p>
          </div>
        </div>
      </div>
      {user && (
        <div className="relative mt-4 flex w-full justify-end">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
