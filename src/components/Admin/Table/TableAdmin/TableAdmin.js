import React from "react";
import { Label, Button, Icon, Checkbox, Loader } from "semantic-ui-react";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const { table } = props;

  return (
    <div className="table-admin">
      <IcTable />
      <p>Mesa {table.number}</p>
    </div>
  );
}
