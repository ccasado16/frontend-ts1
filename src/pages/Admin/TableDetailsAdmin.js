import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useOrder } from "../../hooks";
import { HeaderPage } from "../../components/Admin";
import { ListOrderAdmin } from "../../components/Admin/TableDetails";

export function TableDetailsAdmin() {
  const { id } = useParams();
  const { loading, orders, getOrdersByTable } = useOrder();
  const [reloadOrders, setReloadOrders] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [reloadOrders]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);

  return (
    <>
      <HeaderPage title={`Mesa ***`} />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}
    </>
  );
}
