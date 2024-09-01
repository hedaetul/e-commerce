"use client";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import ProfileWrapper from "../ProfileWrapper";

const Address = () => {
  const addresses = [
    {
      type: "Office",
      address: "497 Erdman Passage, New Zoietown, Paraguay",
      phone: "(213) 840-9416",
    },
    {
      type: "Shop",
      address: "8000 Evans Brooks, Lake Jo, Mongolia",
      phone: "345-510-1406",
    },
    {
      type: "Garage",
      address: "978 Elton Springs, Eribertoview, Uganda",
      phone: "(932) 581-1393",
    },
    {
      type: "Coffee House",
      address: "3899 Gutkowski Views, North Claudiamouth, Ghana",
      phone: "201.292.9655 x140",
    },
    {
      type: "Italian Restaurant",
      address: "789 Spencer Lock, Lolitaberg, Tanzania",
      phone: "445-946-3391",
    },
  ];

  return (
    <ProfileWrapper>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <FaAddressCard className="mr-2 text-2xl text-red-500" />
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
        <div className="mx-auto w-full rounded-lg">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
            >
              <div className="grid grid-cols-3 gap-24">
                <h4 className="font-medium">{address.type}</h4>
                <p className="text-sm text-gray-600">{address.address}</p>
                <p className="text-sm text-gray-600">{address.phone}</p>
              </div>
              <div className="flex items-center space-x-4">
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
            </div>
          ))}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default Address;
