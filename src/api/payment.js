import { BASE_API, PAYMENT_STATUS } from "../utils/constants";

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

export async function getPaymentByTableApi(idTable) {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `status=${PAYMENT_STATUS.Pendiente}`;

    const url = `${BASE_API}api/payments/?${tableFilter}&${statusFilter}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export async function closePaymentApi(idPayment) {
  try {
    const url = `${BASE_API}api/payments/${idPayment}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: PAYMENT_STATUS.Pagado }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function getPaymentsApi() {
  try {
    const paymentFilter = `status=${PAYMENT_STATUS.Pagado}`;
    const orderingFilter = `ordering=created_at`;
    const url = `${BASE_API}api/payments/?${paymentFilter}&${orderingFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

