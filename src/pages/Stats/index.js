import React, { Component } from "react";

import "./style.scss";
import CG from "home/utils/CG";
import Header from "home/components/Header";

/** Страница Статистики */

class Stats extends Component {
  render() {
    return (
      <div className={CG("stats")}>
        <Header title="Статистика" />
        <h1>Размер bundle</h1>
        <iframe className="report" src="report.html" name="report" />
      </div>
    );
  }
}

export default Stats;
