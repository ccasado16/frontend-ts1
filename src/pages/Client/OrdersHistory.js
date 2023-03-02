import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { useOrder, useTable } from "../../hooks";
import { OrdersHistoryItem } from "../../components/Client";
import { ConfirmModal } from "../../components/Common/ConfirmModal/ConfirmModal";

export function OrdersHistory() {
  const [showTypePayment, setShowTypePayment] = useState(false);
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
          {size(orders) > 0 && (
            <Button
              primary
              fluid
              style={{ margin: "20px 0" }}
              onClick={() => setShowTypePayment(true)}
            >
              Pedir la cuenta
            </Button>
          )}

          {map(orders, (order) => (
            <OrdersHistoryItem key={order.id} order={order} />
          ))}
        </>
      )}

      <ConfirmModal
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => console.log("pagar con efectivo")}
        onConfirmText="Tarjeta"
        onConfirm={() => console.log("Pagar con tarjeta")}
      />
    </div>
  );
}
