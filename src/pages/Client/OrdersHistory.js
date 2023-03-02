import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { useOrder, useTable } from "../../hooks";
import { OrdersHistoryItem } from "../../components/Client";

export function OrdersHistory() {
  const { loading, orders, getOrdersByTable } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTable = table[0].id;

      getOrdersByTable(idTable, "", "ordering=-status,-created_at");
    })();
  }, []);

  return (
    <div>
      <h3>Historial de pedidos</h3>
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {map(orders, (order) => (
            <OrdersHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
}
