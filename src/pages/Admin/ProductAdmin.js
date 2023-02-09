import React, { useEffect, useState } from "react";
import {
  HeaderPage,
  TableProductAdmin,
  AddEditProductForm,
} from "../../components/Admin";
import { useProduct } from "../../hooks";
import { BasicModal } from "../../components/Common";
import { Loader } from "semantic-ui-react";

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setcontentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo producto");
    setcontentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar producto");
    setcontentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
  };

  return (
    <>
      <HeaderPage
        title="Product Admin"
        btnTitle="Nuevo producto"
        btnClick={addProduct}
      />

      {loading ? (
        <Loader active inline="centered">
          Cargando productos
        </Loader>
      ) : (
        <TableProductAdmin products={products} updateProduct={updateProduct} />
      )}

      <BasicModal
        title={titleModal}
        show={showModal}
        onClose={openCloseModal}
        children={contentModal}
      />
    </>
  );
}
