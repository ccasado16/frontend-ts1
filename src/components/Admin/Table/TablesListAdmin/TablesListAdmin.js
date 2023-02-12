import React, { useState } from "react";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import { map, size } from "lodash";
import { TableAdmin } from "../";
import "./TablesListAdmin.scss";

export function TablesListAdmin(props) {
  const { tables } = props;

  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  return (
    <div className="tables-list-admin">
      <Button
        className="tables-list-admin__reload"
        primary
        icon
        onClick={onReload}
      >
        <Icon name="refresh" />
      </Button>

      <div className="tables-list-admin__reload-toggle">
        <span>Reload automático</span>
        <Checkbox toggle onChange={(_, data) => console.log(data.checked)} />
      </div>
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
}
