"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import convertSubCurrency from "@/lib/convertSubCurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("card");
  const [paypalEmail, setPaypalEmail] = useState("");
  const { setAddFormData, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (selectedTab === "card") {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertSubCurrency(amount) }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setErrorMessage("Failed to load payment details.");
        });
    }
  }, [amount, selectedTab]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    try {
      if (selectedTab === "card") {
        // Confirm the payment
        const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/confirmation`,
          },
        });

        if (error) {
          setErrorMessage(error.message || "An error occurred.");
        } else {
          // Payment succeeded
          setAddFormData({
            paymentMethod: "card",
            status: "paid",
          });
          clearCart();
          router.push("/confirmation"); // Redirect to confirmation page
        }
      } else if (selectedTab === "paypal") {
        // Handle PayPal payment
        console.log("Proceeding with PayPal payment with email:", paypalEmail);
        setAddFormData({
          paymentMethod: "paypal",
          email: paypalEmail,
          status: "pending",
        });
        clearCart();
        window.location.href = "/confirmation"; // Redirect to confirmation page
      } else if (selectedTab === "cod") {
        // Handle Cash on Delivery
        console.log("Order placed with Cash on Delivery.");
        setAddFormData({
          paymentMethod: "cod",
          status: "cod",
        });
        clearCart();
        window.location.href = "/confirmation"; // Redirect to confirmation page
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-white p-4">
      <h2 className="mb-4 text-xl font-bold">Choose a payment method:</h2>
      <div className="mb-4 flex">
        <button
          type="button"
          className={`flex-1 px-4 py-2 text-center ${
            selectedTab === "card" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("card")}
        >
          Credit/Debit Card
        </button>
        <button
          type="button"
          className={`flex-1 px-4 py-2 text-center ${
            selectedTab === "paypal" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("paypal")}
        >
          PayPal
        </button>
        <button
          type="button"
          className={`flex-1 px-4 py-2 text-center ${
            selectedTab === "cod" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("cod")}
        >
          Cash on Delivery
        </button>
      </div>

      {selectedTab === "card" && clientSecret && <PaymentElement />}
      {selectedTab === "paypal" && (
        <div className="mb-4">
          <label className="mb-2 block font-medium">PayPal Email</label>
          <input
            type="email"
            placeholder="Enter your PayPal email"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            className="w-full rounded-md border px-4 py-2"
          />
        </div>
      )}
      {selectedTab === "cod" && (
        <p className="mb-4">You have selected Cash on Delivery.</p>
      )}

      {selectedTab === "card" && errorMessage && (
        <div className="mb-4 text-red-500">{errorMessage}</div>
      )}
      <Button className="mt-4">
        {!loading ? `Pay ${amount}` : "Processing..."}
      </Button>
    </form>
  );
};

export default CheckoutForm;
