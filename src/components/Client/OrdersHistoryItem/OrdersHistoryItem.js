import React from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import { ORDER_STATUS } from "../../../utils/constants";
import "./OrdersHistoryItem.scss";

export function OrdersHistoryItem(props) {
  const { order } = props;
  const { title, image } = order.product_data;

  return (
    <div
      className={classNames("orders-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="orders-history-item__time">
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>

      <div className="orders-history-item__product">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.Pendiente ? (
        <span>En marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
}
