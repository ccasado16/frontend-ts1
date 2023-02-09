import React from "react";
import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableProductAdmin.scss";

export function TableProductAdmin(props) {
  const { products, updateProduct } = props;

  return (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={product.image} alt={product.title} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>s/. {product.price}</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>

            <Action product={product} updateProduct={updateProduct} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Action(props) {
  const { product, updateProduct } = props;

  return (
    <Table.Cell>
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => console.log("Eliminar")}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
