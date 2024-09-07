"use client";

import Spinner from "@/components/custom/spinner";
import { fetchOrdersAndCount, Order } from "@/lib/firebaseUtils";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProfileWrapper from "../components/ProfileWrapper";

const Orders = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { orders } = await fetchOrdersAndCount();
        setOrders(orders);
        console.log(orders);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <ProfileWrapper>
        <Spinner />
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <FaShoppingCart className="mr-2 text-2xl text-red-500" />
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>
        <div className="overflow-hidden rounded bg-white shadow">
          <div className="grid grid-cols-4 gap-4 border-b p-4 font-bold text-gray-700">
            <div>Order #</div>
            <div>Status</div>
            <div>Date purchased</div>
            <div>Total</div>
          </div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="grid grid-cols-4 items-center gap-4 border-b p-4 hover:bg-gray-100"
              >
                <div className="font-medium text-gray-700">{order.orderId}</div>
                <div className="flex items-center">
                  <span
                    className={`rounded-full px-2 py-1 text-sm font-semibold ${
                      order.paymentMethod === "Pending"
                        ? "bg-gray-200 text-gray-600"
                        : order.paymentMethod === "Processing"
                          ? "bg-blue-200 text-blue-600"
                          : order.paymentMethod === "Delivered"
                            ? "bg-green-200 text-green-600"
                            : "bg-red-200 text-red-600"
                    }`}
                  >
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="text-gray-600">{order.date}</div>
                <div className="font-semibold text-gray-800">
                  ${order.totalAmount.toFixed(2)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default Orders;
