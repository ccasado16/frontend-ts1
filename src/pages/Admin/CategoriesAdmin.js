import React, { useEffect, useState } from "react";
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import { Loader } from "semantic-ui-react";
import { useCategory } from "../../hooks";
import { BasicModal } from "../../components/Common";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contenModal, setContenModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva categoria");
    setContenModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar categoria");
    setContenModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  return (
    <>
      <HeaderPage
        title="Categorias"
        btnTitle="Nueva categoria"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
        />
      )}

      <BasicModal
        title={titleModal}
        show={showModal}
        children={contenModal}
        onClose={openCloseModal}
      />
    </>
  );
}
