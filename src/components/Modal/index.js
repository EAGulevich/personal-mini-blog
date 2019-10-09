import React from "react";

import "./style.scss";

export default function Modal(props) {
  return <div className="modal">{props.children}</div>;
}
