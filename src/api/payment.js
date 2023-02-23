import { BASE_API } from "../utils/constants";

export async function createPaymentApi(paymentData) {
  try {
    const url = `${BASE_API}api/payments/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
