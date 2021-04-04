import React from "react";
import { useSelector } from "react-redux";

export const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  console.log("alerts", alerts);

  return alerts.map((alert) => (
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
      {alert.msg}
    </div>
  ));
};
