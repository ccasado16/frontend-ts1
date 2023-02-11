import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddEditTableForm.scss";
import { useTable } from "../../../../hooks";

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props;
  const { addTable, updateTable } = useTable();

  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(
      table ? updateValidationSchema() : validationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formData) => {
      if (table) updateTable(table.id, formData);
      else await addTable(formData);
      onRefetch();
      onClose();
    },
  });

  return (
    <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        placeholder="Número de mesa"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button
        type="submit"
        primary
        fluid
        content={table ? "Actualizar" : "Crear"}
      ></Button>
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().required(true),
  };
}

function updateValidationSchema() {
  return {
    number: Yup.string().required(true),
  };
}
