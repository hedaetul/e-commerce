"use client";

import { Button } from "@/components/ui/button";
import convertSubCurrency from "@/lib/convertSubCurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const StripePayment = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertSubCurrency(amount) }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret returned from server.");
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setErrorMessage("Failed to initialize payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded properly.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred.");
      } else {
        // Handle successful payment
        console.log("Payment successful");
      }
    } catch (error) {
      setErrorMessage("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <p>Loading...</p>
      ) : clientSecret ? (
        <>
          <PaymentElement />
          <Button type="submit">Pay {amount}</Button>
        </>
      ) : (
        <p>{errorMessage || "Failed to load payment details."}</p>
      )}
    </form>
  );
};

export default StripePayment;
