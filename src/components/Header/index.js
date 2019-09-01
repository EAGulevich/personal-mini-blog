import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

import "./style.scss";
import CG from "home/utils/CG";

/** Компонент для отображения поста с кратким описанием */

class Header extends Component {
  static get propTypes() {
    return {
      /**Заголовок */
      title: PropTypes.string.isRequired,
      /**коллбэк на возвращение на предыдующую страницу, если есть, то будет показываться кнопка Назад */
      onGoToBack: PropTypes.func
    };
  }
  static get defaultProps() {
    return {
      title: ""
    };
  }
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "header");
  }

  render() {
    const isBackButton = typeof this.props.onGoToBack === "function";
    return (
      <div className={this.CG()}>
        {isBackButton && (
          <div className={this.CG("link")} onClick={this.props.onGoToBack}>
            Назад
          </div>
        )}
        <div className={this.CG("title")}>{this.props.title}</div>
      </div>
    );
  }
}

export default Header;
