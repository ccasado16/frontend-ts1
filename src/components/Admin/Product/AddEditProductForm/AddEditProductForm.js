import React, { useCallback, useEffect, useState } from "react";
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory, useProduct } from "../../../../hooks";
import "./AddEditProductForm.scss";

export function AddEditProductForm(props) {
  const { onClose, onRefetch, product } = props;
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [previewImage, setPreviewImage] = useState(
    product ? product?.image : null
  );
  const { categories, getCategories } = useCategory();
  const { addProduct, updateProduct } = useProduct();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(
      product ? updateValidationSchema() : validationSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formData) => {
      if (product) updateProduct(product.id, formData);
      else await addProduct(formData);
      onRefetch();
      onClose();
    },
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="Categoria"
        fluid
        search
        selection
        options={categoriesFormat}
        values={formik.values.category}
        error={formik.errors.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto activo
      </div>

      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>
      <input {...getInputProps()} />
      <Image centered src={previewImage} />

      <Button
        type="submit"
        fluid
        primary
        content={product ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    value: item.id,
    text: item.title,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.string().required(true),
    category: Yup.string().required(true),
    active: Yup.bool().required(true),
    image: Yup.string().required(true),
  };
}

function updateValidationSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.string().required(true),
    category: Yup.string().required(true),
    active: Yup.bool().required(true),
    image: Yup.string(),
  };
}
