"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import AppWrapper from "../AppWrapper";

const Carts: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [voucher, setVoucher] = useState("");

  const handleApplyVoucher = () => {
    // Implement voucher application logic
  };

  const { toast } = useToast();
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      router.push("/checkout");
    } else {
      toast({
        title: "The cart is empty",
        description: "You have no item in cart",
        className: "bg-rose-600 text-white",
      });
    }
  };

  return (
    <AppWrapper>
      <div className="container mx-auto px-4 py-8 md:flex">
        <div className="pr-4 md:w-2/3">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.photo}
                      alt={item.name} width={100} height={100}
                      className="mr-4 h-16 w-16 object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="mr-2"
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="mr-2"
                    >
                      +
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      <FaRegTrashAlt />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  Total Amount: ${subtotal.toFixed(2)}
                </h2>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="md:w-1/3 md:pl-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Checkout</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note (optional)"
                className="mb-4 h-24 w-full resize-none rounded-lg border border-gray-300 p-2"
              />
              <div className="mb-4">
                <input
                  type="text"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value)}
                  placeholder="Enter voucher code"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
                <Button
                  onClick={handleApplyVoucher}
                  variant="outline"
                  className="mt-2 border-2 border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-gray-100"
                >
                  Apply Voucher
                </Button>
              </div>
              <Button onClick={handleCheckout} className="w-full">
                Checkout
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </AppWrapper>
  );
};

export default Carts;
