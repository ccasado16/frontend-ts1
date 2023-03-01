import React from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./ListProducts.scss";

export function ListProducts(props) {
  const { products } = props;

  const addCart = (product) => {
    console.log("Producto añadido al carrito", product.title);
  };
  return (
    <div className="list-products-client">
      {map(products, (product) => (
        <div key={product.id} className="list-products-client__product">
          <div>
            <Image src={product.image} />
            <span>{product.title}</span>
          </div>

          <Button primary icon onClick={addCart(product)}>
            <Icon name="add" />
          </Button>
        </div>
      ))}
    </div>
  );
}
