import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
} from "../../components/Admin";
import { BasicModal } from "../../components/Common";
import { Loader } from "semantic-ui-react";

export function UsersAdmin() {
  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { loading, users, getUsers, deleteUser } = useUser();
  const [refetch, setRefetch] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  useEffect(() => {
    getUsers();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo Usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Editar Usuario");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Eliminar usuario ${data.email}?`);

    if (result) {
      try {
        await deleteUser(data.id);
        onRefetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando usuarios...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
