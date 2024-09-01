"use client";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  FaCcAmex,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
  FaPaypal,
} from "react-icons/fa";
import ProfileWrapper from "../ProfileWrapper";

const PaymentMethods = () => {
  const methodsData = [
    {
      icon: <FaCcAmex size={30} color="#0070BA" />,
      name: "Hedaetul Islam",
      details: "4242 **** **** ****",
      expiry: "08 / 2025",
    },
    {
      icon: <FaCcMastercard size={30} color="#EB001B" />,
      name: "Hedaetul Islam",
      details: "1234 **** **** ****",
      expiry: "10 / 2025",
    },
    {
      icon: <FaPaypal size={30} color="#003087" />,
      name: "Hedaetul Islam",
      details: "hedaetul.offical@gmail.com",
      expiry: "",
    },
    {
      icon: <FaCcVisa size={30} color="#1A1F71" />,
      name: "Hedaetul Islam",
      details: "4242 **** **** ****",
      expiry: "08 / 2025",
    },
  ];
  return (
    <ProfileWrapper>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <FaCreditCard className="mr-2 text-2xl text-red-500" />
          <h1 className="text-2xl font-bold">Payment Methods</h1>
        </div>
        <div className="w-full rounded-lg">
          {methodsData.map((method, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div>{method.icon}</div>
                <div className="grid grid-cols-3 gap-24">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.details}</p>
                  <p className="text-sm text-gray-600">{method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button>
                  <AiFillEdit
                    className="text-gray-500 hover:text-blue-600"
                    size={20}
                  />
                </button>
                <button>
                  <AiFillDelete
                    className="text-gray-500 hover:text-red-600"
                    size={20}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default PaymentMethods;
