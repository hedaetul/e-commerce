"use client";

import { useCart } from "@/context/CartContext";
import { auth, firestore } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AppWrapper from "../AppWrapper";
import AddressForm from "./components/addressForm";
import OrderSummary from "./components/orderSummary";

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [billingData, setBillingData] = useState({
    fullName: "",
    phoneNumber: "",
    zipCode: "",
    address1: "",
    email: "",
    company: "",
    country: "",
    address2: "",
  });
  const [shippingData, setShippingData] = useState({
    fullName: "",
    phoneNumber: "",
    zipCode: "",
    address1: "",
    email: "",
    company: "",
    country: "",
    address2: "",
  });
  const [showShippingAddress, setShowShippingAddress] = useState(true);
  const [subtotal, setSubtotal] = useState(() => {
    const savedSubtotal = localStorage.getItem("subtotal");
    return savedSubtotal ? parseFloat(savedSubtotal) : 100;
  });
  const [shippingCharge, setShippingCharge] = useState(10);
  const [tax, setTax] = useState(8);
  const [discount, setDiscount] = useState(5);

  const total = subtotal + shippingCharge + tax - discount;

  useEffect(() => {
    const savedBillingData = localStorage.getItem("billingData");
    if (savedBillingData) {
      setBillingData(JSON.parse(savedBillingData));
    }
    const savedShippingData = localStorage.getItem("shippingData");
    if (savedShippingData) {
      setShippingData(JSON.parse(savedShippingData));
    }
  }, []);

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedBillingData = { ...billingData, [name]: value };
    setBillingData(updatedBillingData);
    localStorage.setItem("billingData", JSON.stringify(updatedBillingData));
  };

  const handleShippingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const updatedShippingData = { ...shippingData, [name]: value };
    setShippingData(updatedShippingData);
    localStorage.setItem("shippingData", JSON.stringify(updatedShippingData));
  };

  const handleShippingAddressToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      setShippingData(billingData);
      setShowShippingAddress(false);
    } else {
      setShowShippingAddress(true);
    }
  };

  return (
    <AppWrapper>
      <div className="container mx-auto grid grid-cols-3 gap-8 px-4 py-8">
        <div className="col-span-2">
          <AddressForm
            title="Address Form"
          />
        </div>
        <div className="col-span-1">
          <OrderSummary
            subtotal={subtotal}
            shippingCharge={shippingCharge}
            tax={tax}
            discount={discount}
            total={total}
          />
        </div>
      </div>
    </AppWrapper>
  );
};

export default Checkout;
