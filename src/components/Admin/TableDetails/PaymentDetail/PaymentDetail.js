import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { usePayment, useOrder } from "../../../../hooks";
import "./PaymentDetail.scss";

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const getIconPayment = (key) => {
    if (key === "Tarjeta") return "credit card outline";
    if (key === "Efectivo") return "money bill alternate outline";
    return null;
  };

  const onCloseTable = async () => {
    const result = window.confirm(
      "¿Desea marcar la mesa como pagada y cerrarla?"
    );

    if (result) {
      await closePayment(payment.id);

      for await (const order of orders) {
        await closeOrder(order.id);
      }

      onReloadOrders();
      openCloseModal();
    }
  };

  return (
    <div className="payment-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa: </Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Total: </Table.Cell>
            <Table.Cell>{payment.total_payment}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Forma de pago: </Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment.payment_type)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Button primary fluid onClick={onCloseTable}>
        Marcar como pagado y cerrar mesa
      </Button>
    </div>
  );
}
