import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";
import { size } from "lodash";
import { ListProductCart } from "../../components/Client/ListProductCart/ListProductCart";

export function Cart() {
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const { getProductById } = useProduct();
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();

      const productsArray = [];

      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h3>Carrito</h3>
      {!products ? (
        <p>Cargando ..</p>
      ) : size(products) === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito está vacío</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}
