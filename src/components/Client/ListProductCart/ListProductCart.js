import React, { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams } from "react-router-dom";
import "./ListProductCart.scss";

export function ListProductCart(props) {
  const { products } = props;
  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title.substring(0, 15)}</span>
          </div>
          <span>s/. {product.price}</span>
          <Icon name="close" />
        </div>
      ))}

      <Button primary fluid>
        Realizar pedido
      </Button>
    </div>
  );
}
