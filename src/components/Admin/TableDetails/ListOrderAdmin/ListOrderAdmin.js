import React from "react";
import "./ListOrderAdmin.scss";
import { OrderItemAdmin } from "../";
import { map } from "lodash";

export function ListOrderAdmin(props) {
  const { orders, onReloadOrders } = props;

  return (
    <div className="list-orders-admin">
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.id}
          order={order}
          onReloadOrders={onReloadOrders}
        />
      ))}
    </div>
  );
}
