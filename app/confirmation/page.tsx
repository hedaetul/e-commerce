"use client";

import Spinner from "@/components/custom/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Confirmed from "@/dist/images/confirmed.png";
import { getLatestOrder } from "@/lib/firebaseUtils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ConfirmationPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { successMessage } = useCart();
  const { user } = useAuth();
  console.log(orderDetails);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      if (!user || !user.uid) return;

      try {
        console.log("userUid :", user.uid);
        const orderData = await getLatestOrder(user.uid);
        console.log("Order data: ", orderData);
        setOrderDetails(orderData);
      } catch (error) {
        console.error("Error fetching latest order: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestOrder();
  }, [user]);

  if (loading) {
    return (
      <div className="flex-col-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!orderDetails) {
    return <p>Order details not found.</p>;
  }

  const {
    orderId: orderID,
    date,
    subtotal,
    shippingCharge,
    tax,
    discount,
    totalAmount,
    paymentMethod,
    items,
  } = orderDetails;

  const formattedDate = format(date.toDate(), "MMMM dd, yyyy");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="print-only">
        <header className="flex-col-center gap-3 bg-gray-800 py-4 text-center text-white">
          <h1 className="icon-7">Bajar</h1>
          <p className="text-lg italic text-rose-100">Order Confirmation</p>
        </header>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="relative mb-4 flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Date: {formattedDate}</p>
              <p className="text-sm text-gray-600">Order ID: {orderID}</p>
            </div>
            <Image
              src={Confirmed}
              alt="confirmed_stamp"
              width={200}
              className="absolute right-0 opacity-90"
            />
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Payment Method</h2>
            <p className="text-gray-800">
              {paymentMethod.replace(/-/g, " ").toUpperCase()}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Order Summary</h2>
            <ul className="space-y-2">
              {items.map((item: any) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="my-4 border-gray-300" />

          <div className="space-y-2 text-lg font-bold">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Charge:</span>
              <span>${shippingCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <footer className="mt-8 bg-gray-100 py-4 text-center text-gray-600">
          <p>
            If you have any questions or need assistance, please contact us:
          </p>
          <p>Email: support@bajar.com | Phone: (123) 456-7890</p>
        </footer>
      </div>
      <div className="mt-8 text-center no-print">
        <Button variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button className="ml-4">
          <a href="#" onClick={() => window.print()}>
            Print Receipt
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
