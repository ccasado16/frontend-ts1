import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks";
import "./AddEditUserForm.scss";

export function AddEditUserForm(props) {
  const { onClose, onRefetch, user } = props;
  const { addUser, updateUser } = useUser();

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(
      user ? updateValidationSchema() : validationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (user) await updateUser(user.id, formValue);
        else await addUser(formValue);

        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="first_name"
        placeholder="Nombre"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        error={formik.errors.first_name}
      />
      <Form.Input
        name="last_name"
        placeholder="Apellidos"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        error={formik.errors.last_name}
      />
      <Form.Input
        name="username"
        placeholder="Nombre de usuario"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
        />
        Usuario activo
      </div>

      <div className="add-edit-user-form__staff">
        <Checkbox
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
        />
        Usuario administrador (staff)
      </div>

      <Button
        type="submit"
        primary
        fluid
        content={user ? "Actualizar" : "Crear usuario"}
      />
    </Form>
  );
}

function initialValues(user) {
  return {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    is_active: user?.is_active ? true : false,
    is_staff: user?.is_staff ? true : false,
  };
}

function validationSchema() {
  return {
    first_name: Yup.string(),
    last_name: Yup.string(),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}

function updateValidationSchema() {
  return {
    first_name: Yup.string(),
    last_name: Yup.string(),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true),
  };
}
