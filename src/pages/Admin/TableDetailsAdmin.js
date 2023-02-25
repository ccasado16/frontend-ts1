import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useOrder, useTable, usePayment } from "../../hooks";
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import {
  ListOrderAdmin,
  PaymentDetail,
} from "../../components/Admin/TableDetails";
import { BasicModal } from "../../components/Common";
import { forEach, size } from "lodash";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { table, getTable } = useTable();
  const { createPayment, getPaymentByTable } = usePayment();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      // console.log(response);
      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm("¿Desea generar la cuenta de la mesa?");

    if (result) {
      let totalPayment = 0;

      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTypePayment = window.confirm(
        `Para pagar con tarjeta pulse "Aceptar", para pagar en efectivo pulse "Cancelar".`
      );

      const paymentData = {
        table: id,
        total_payment: totalPayment.toFixed(2),
        payment_type: resultTypePayment ? "Tarjeta" : "Efectivo",
        status: "Pendiente",
      };

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }

      onReloadOrders();
    }
  };

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePayment}
      />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}
      <BasicModal
        title="Generar pedido"
        show={showModal}
        onClose={openCloseModal}
      >
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idTable={id}
            openCloseModal={openCloseModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </BasicModal>
    </>
  );
}
