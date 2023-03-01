import React, { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useParams } from "react-router-dom";
import { removeProductCartApi } from "../../../api/cart";
import "./ListProductCart.scss";

export function ListProductCart(props) {
  const { products, onReloadCart } = props;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalTemp = 0;

    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });

    setTotal(totalTemp.toFixed(2));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title.substring(0, 15)}</span>
          </div>
          <span>s/. {product.price}</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}

      <Button primary fluid>
        Realizar pedido (s/. {total})
      </Button>
    </div>
  );
}
