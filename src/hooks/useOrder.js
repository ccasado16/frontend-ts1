import { useState } from "react";
import { getOrdersByTableApi } from "../api/orders";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);

  const getOrdersByTable = async (idTable, status, ordering) => {
    try {
      setLoading(true);
      const response = await getOrdersByTableApi(idTable, status, ordering);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return {
    loading,
    error,
    orders,
    getOrdersByTable,
  };
}
