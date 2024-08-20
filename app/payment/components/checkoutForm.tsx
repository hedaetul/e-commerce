"use client";

import { Button } from "@/components/ui/button";
import convertSubCurrency from "@/lib/convertSubCurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    console.log(clientSecret);
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://wwww.localhost:3000/payment-success?amount=&{amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    <div className="flex items-center justify-center">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-white p-2">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <Button> {!loading ? `Pay ${amount}` : "Processing..."}</Button>
    </form>
  );
};

export default CheckoutForm;
