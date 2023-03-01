import React from "react";
import { useParams, Link } from "react-router-dom";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categoria</Link>
      <p>tableNumber: {tableNumber}</p>
      <p>idCategory: {idCategory}</p>
    </div>
  );
}
