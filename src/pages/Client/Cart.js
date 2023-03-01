import React, { useEffect, useState } from "react";
import { useProduct } from "../../hooks";
import { getProductsCart } from "../../api/cart";

export function Cart() {
  const [products, setProducts] = useState(null);
  const { getProductById } = useProduct();
  console.log(products);
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
  }, []);

  return <div>Cart</div>;
}
