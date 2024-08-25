"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { auth } from "@/lib/firebase";
import { fetchOrderData } from "@/lib/firebaseUtils";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ConfirmationPage: React.FC = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { successMessage } = useCart();
  console.log(successMessage);
  console.log(orderData);

  

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        // Redirect or show an error if user is not logged in
        // You might want to use router.push('/login') if handling redirects
        return;
      }

      const userId = auth.currentUser.uid;
      const orderId = searchParams.get("orderId");
      console.log(orderId);
      

      if (orderId) {
        try {
          const data = await fetchOrderData(userId, orderId);
          setOrderData(data);
        } catch (error) {
          console.error("Error fetching order data:", error);
          // Handle error state, maybe show an error message
        }
        setLoading(false);
      }
    };

    fetchData();
    
  }, [searchParams]);

  if (successMessage === true) {
    return <p>Loading...</p>;
  } else {
    const {
      orderId,
      date,
      subtotal,
      shippingCharge,
      tax,
      discount,
      totalAmount,
      paymentMethod,
      items,
    } = orderData as {
      orderId: string;
      date: { toDate: () => Date };
      subtotal: number;
      shippingCharge: number;
      tax: number;
      discount: number;
      totalAmount: number;
      paymentMethod: string;
      items: { id: string; name: string; price: number; quantity: number }[];
    };

    const formattedDate = format(date.toDate(), "MMMM dd, yyyy");

    return (
      <div className="container mx-auto px-4 py-8">
        <header className="flex-col-center gap-3 bg-gray-800 py-4 text-center text-white">
          <h1 className="icon-7">Bajar</h1>
          <p className="text-lg italic text-rose-100">Order Confirmation</p>
        </header>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Date: {formattedDate}</p>
            <p className="text-sm text-gray-600">Order ID: {orderId}</p>
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
              {items.map((item) => (
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

        <div className="mt-8 text-center">
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
  }
};

export default ConfirmationPage;
