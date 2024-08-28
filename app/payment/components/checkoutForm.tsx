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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");

  const {
    setAddFormData,
    clearCart,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    successMessage,
    setSuccessMessage,
    cartItems,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (selectedPaymentMethod === "credit-card") {
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
  }, [amount, selectedPaymentMethod]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded properly.");
      setLoading(false);
      return;
    }

    try {
      if (selectedPaymentMethod === "credit-card") {
        if (!clientSecret) {
          setErrorMessage("Payment intent not initialized properly.");
          setLoading(false);
          return;
        }

        const submitResponse = await elements.submit();

        if (submitResponse.error) {
          setErrorMessage(submitResponse.error.message);
          setLoading(false);
          return;
        }

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
          clearCart();
          setSuccessMessage(true);
          window.location.href = "/confirmation";
        }
      } else if (selectedPaymentMethod === "paypal") {
        clearCart();
        setSuccessMessage(true);
        window.location.href = "/confirmation";
      } else if (selectedPaymentMethod === "cash-on-delivery") {
        successOrder("cash-on-delivery");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  const successOrder = async (method: string) => {
    try {
      setSelectedPaymentMethod(method);

      const hasItems = cartItems.length > 0;
      if (hasItems) {
        setSuccessMessage(true);
      }
      clearCart();
      if (hasItems) {
        window.location.href = "/confirmation";
      }
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-white p-4">
      <h2 className="mb-4 text-xl font-bold">Choose a payment method:</h2>
      <div className="mb-4 flex">
        <button
          disabled
          type="button"
          className={`flex-1 px-4 py-2 text-center ${
            selectedPaymentMethod === "credit-card"
              ? "bg-rose-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedPaymentMethod("credit-card")}
        >
          Credit/Debit Card
        </button>
        <button
          disabled
          type="button"
          className={`flex-1 px-4 py-2 text-center ${
            selectedPaymentMethod === "paypal"
              ? "bg-rose-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedPaymentMethod("paypal")}
        >
          PayPal
        </button>
        <button
          type="button"
          className={`flex-1 px-4 py-2 text-center ${
            selectedPaymentMethod === "cash-on-delivery"
              ? "bg-rose-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => successOrder("cash-on-delivery")}
        >
          Cash on Delivery
        </button>
      </div>

      {selectedPaymentMethod === "credit-card" && clientSecret && (
        <PaymentElement />
      )}
      {selectedPaymentMethod === "paypal" && (
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
      {selectedPaymentMethod === "cash-on-delivery" && (
        <p className="mb-4">You have selected Cash on Delivery.</p>
      )}

      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-rose-500 px-4 py-2 text-white"
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
