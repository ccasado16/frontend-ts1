import { useState } from "react";
import { createPaymentApi } from "../api/payment";

export function usePayment() {
  const [error, setError] = useState(null);

  const createPayment = async (paymentData) => {
    try {
      return await createPaymentApi(paymentData);
    } catch (error) {
      setError(error);
    }
  };

  return { error, createPayment };
}
