import PropTypes from "prop-types";
import React, { Component } from "react";
import { map } from "lodash";

import "./style.scss";
import CG from "home/utils/CG";
import Modal from "home/components/Modal";

const BUTTON_MODEL = PropTypes.shape({
  /**название */
  name: PropTypes.string.isRequired,
  /**коллбэк */
  onClick: PropTypes.func.isRequired
});

/** Компонент для диалога с пользователем */

class Dialog extends Component {
  static get propTypes() {
    return {
      /**Заголовок */
      title: PropTypes.string.isRequired,
      /**Описание */
      description: PropTypes.string.isRequired,
      /**Массив кнопок */
      buttons: PropTypes.arrayOf(BUTTON_MODEL)
    };
  }
  static get defaultProps() {
    return {
      title: "",
      description: "",
      buttons: []
    };
  }
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "dialog");
  }

  renderButtons() {
    return (
      <div className={this.CG("buttons")}>
        {map(this.props.buttons, (button, index) => {
          return (
            <button key={index} onClick={button.onClick}>
              {button.name}
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <Modal>
        <div className={this.CG()}>
          <div className={this.CG("title")}>{this.props.title}</div>
          <div className={this.CG("description")}>{this.props.description}</div>
          {this.renderButtons()}
        </div>
      </Modal>
    );
  }
}

export default Dialog;
