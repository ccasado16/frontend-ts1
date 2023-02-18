import React from "react";
import { Button, Image } from "semantic-ui-react";
import "./OrderItemAdmin.scss";

export function OrderItemAdmin(props) {
  const { order } = props;
  const { title, image } = order.product_data;
  return (
    <div className="order-item-admin">
      <div className="order-item-admin__time">{order.created_at}</div>
      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
    </div>
  );
}
