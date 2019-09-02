import PropTypes from "prop-types";
import React, { Component } from "react";

import "./style.scss";
import CG from "home/utils/CG";

/** Компонент для отображения комментария */

class Comment extends Component {
  static get propTypes() {
    return {
      /**автор комментария */
      author: PropTypes.string.isRequired,
      /**текст комментария */
      text: PropTypes.string.isRequired
    };
  }

  static get defaultProps() {
    return {
      author: "",
      text: ""
    };
  }
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "comment");
  }

  render() {
    return (
      <div className={this.CG()}>
        <div className={this.CG("author")}>{this.props.author}</div>
        <div className={this.CG("text")}>{this.props.text}</div>
      </div>
    );
  }
}

export default Comment;
