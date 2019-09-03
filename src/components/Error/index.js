import React from "react";

import "./style.scss";

export default function Error(props) {
  return <div className="error">{props.error}</div>;
}
