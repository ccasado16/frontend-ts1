import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";
import { map, size, forEach } from "lodash";
import { useOrder, useTable, usePayment } from "../../hooks";
import { OrdersHistoryItem } from "../../components/Client";
import { ConfirmModal } from "../../components/Common/ConfirmModal/ConfirmModal";

export function OrdersHistory() {
  const [idTable, setIdTable] = useState(null);
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [isRequestAccount, setIsRequestAccount] = useState(false);
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    (async () => {
      const table = await getTableByNumber(tableNumber);
      const idTableTemp = table[0].id;
      setIdTable(idTableTemp);

      getOrdersByTable(idTableTemp, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, []);
  

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);

    let totalPayment = 0;

    forEach(orders, (order) => {
      totalPayment += Number(order.product_data.price);
    });

    const paymentData = {
      table: idTable,
      total_payment: totalPayment.toFixed(2),
      payment_type: paymentType,
      status: "Pendiente",
    };

    const payment = await createPayment(paymentData);

    for await (const order of orders) {
      await addPaymentToOrder(order.id, payment.id);
    }

    window.location.reload();
  };

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
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta ya está pedida"
                : "Pedir cuenta"}
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
        onClose={() => onCreatePayment("Efectivo")}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment("Tarjeta")}
      />
    </div>
  );
}
