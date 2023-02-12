import React, { useState, useEffect } from "react";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import { map, size } from "lodash";
import { TableAdmin } from "../";
import "./TablesListAdmin.scss";

export function TablesListAdmin(props) {
  const { tables } = props;

  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoReload) {
      const autoRealoadAction = () => {
        onReload();
        setTimeout(() => {
          autoRealoadAction();
        }, 5000); // 5 segundos
      };
      autoRealoadAction();
    }
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

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
        <Checkbox
          toggle
          checked={autoReload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        />
      </div>
      {map(tables, (table) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
}
