import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";

import "./style.scss";
import CG from "home/utils/CG";

/** Компонент для отображения поста с кратким описанием */

class Posts extends Component {
  static get propTypes() {
    return {
      /**название поста */
      name: PropTypes.string.isRequired,
      /**описание поста */
      description: PropTypes.string.isRequired,
      /**количество комментариев */
      count: PropTypes.number.isRequired,
      /**ссылка на страницу редактирования поста */
      linkToEdit: PropTypes.string.isRequired,
      /**колбэк для перехода на страницу просмотра поста */
      onGoToPost: PropTypes.func.isRequired
    };
  }
  static get defaultProps() {
    return {
      name: "",
      description: "",
      count: 0
    };
  }
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "post");
  }

  render() {
    return (
      <div className={this.CG()} onClick={this.props.onGoToPost}>
        <div className={this.CG("title")}>{this.props.name}</div>
        <div className={this.CG("description")}>{this.props.description}</div>
        <div className={this.CG("sub-text")}>
          <div className={this.CG("comment-count")}>
            Комментариев: {this.props.count}
          </div>
          <Link
            className={this.CG("link")}
            to={this.props.linkToEdit}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            Редактировать
          </Link>
        </div>
      </div>
    );
  }
}

export default Posts;
