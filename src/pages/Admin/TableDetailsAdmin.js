import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useOrder, useTable } from "../../hooks";
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import { ListOrderAdmin } from "../../components/Admin/TableDetails";
import { BasicModal } from "../../components/Common";

export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable } = useOrder();
  const { table, getTable } = useTable();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrders]);

  useEffect(() => {
    getTable(id);
  }, [id]);

  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <HeaderPage
        title={`Mesa ${table?.number || ""}`}
        btnTitle="Añadir pedido"
        btnClick={openCloseModal}
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
        <AddOrderForm idTable={id} openCloseModal={openCloseModal} />
      </BasicModal>
    </>
  );
}
