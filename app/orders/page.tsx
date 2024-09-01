"use client";

import Spinner from "@/components/custom/spinner";
import { fetchOrdersAndCount, Order } from "@/lib/firebaseUtils";
import { useEffect, useState } from "react";
import ProfileWrapper from "../ProfileWrapper";
import { format } from "date-fns";


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
      <h1 className="mb-4 text-2xl font-bold">My Orders</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 font-bold text-gray-700 border-b">
          <div>Order #</div>
          <div>Status</div>
          <div>Date purchased</div>
          <div>Total</div>
        </div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.orderId}
              className="grid grid-cols-4 gap-4 p-4 items-center border-b hover:bg-gray-100"
            >
              <div className="text-gray-700 font-medium">{order.orderId}</div>
              <div className="flex items-center">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
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
              <div className="text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </div>
              <div className="text-gray-800 font-semibold">
                ${order.totalAmount.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </ProfileWrapper>
  );
};

export default Orders;
