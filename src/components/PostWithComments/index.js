import PropTypes from "prop-types";
import React, { Component } from "react";

import "./style.scss";
import CG from "home/utils/CG";
import Comment from "home/components/Comment";

const COMMENT_AUTHOR = "commentAuthor";
const COMMENT_TEXT = "commentText";

const POST_COMMENT = PropTypes.shape({
  /**автор комментария */
  author: PropTypes.string.isRequired,
  /**текст комментария */
  text: PropTypes.string.isRequired
});

const POST_MODEL = PropTypes.shape({
  /**название поста */
  name: PropTypes.string.isRequired,
  /**полное описание поста */
  description: PropTypes.string.isRequired,
  /**список комментариев */
  comments: PropTypes.arrayOf(POST_COMMENT)
});

/** Компонент для отображение полной информации поста, включая комментарии и поля для добавления комментария */

class PostWithComments extends Component {
  static get propTypes() {
    return {
      /**данные поста */
      model: POST_MODEL,
      /**колбэк для добавление нового комментария, передает автора и текст комментария
       */
      onAddComment: PropTypes.func.isRequired
    };
  }
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "post-with-comments");
    this.onAddComment = this.onAddComment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderCommentAddBlock = this.renderCommentAddBlock.bind(this);

    this.state = {
      [COMMENT_AUTHOR]: "",
      [COMMENT_TEXT]: ""
    };
  }

  onChange(field, e) {
    this.setState({
      [field]: e.target.value
    });
  }

  onAddComment() {
    this.props.onAddComment(
      this.state[COMMENT_AUTHOR],
      this.state[COMMENT_TEXT]
    );
    this.setState({
      [COMMENT_AUTHOR]: "",
      [COMMENT_TEXT]: ""
    });
  }

  renderComments() {
    return (
      <div className={this.CG("comments-block")}>
        {this.props.model.comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              author={comment.author}
              text={comment.text}
            />
          );
        })}
      </div>
    );
  }

  renderCommentAddBlock() {
    return (
      <div className={this.CG("comment-add-block")}>
        <label>Имя комментатора</label>
        <input
          onChange={this.onChange.bind(this, COMMENT_AUTHOR)}
          value={this.state[COMMENT_AUTHOR]}
        />
        <label>Текст комментария</label>
        <textarea
          onChange={this.onChange.bind(this, COMMENT_TEXT)}
          value={this.state[COMMENT_TEXT]}
        />
        <button
          disabled={!this.state[COMMENT_TEXT] || !this.state[COMMENT_AUTHOR]}
          onClick={this.onAddComment}
        >
          Добавить комментарий
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className={this.CG()}>
        <div className={this.CG("title")}>{this.props.model.name}</div>
        <div className={this.CG("description")}>
          {this.props.model.description}
        </div>
        <div className={this.CG("comments-block-title")}>
          {this.props.model.comments.length > 0
            ? "Комментарии:"
            : "К этому посту пока нет комментариев"}
        </div>
        {this.renderComments()}
        {this.renderCommentAddBlock()}
      </div>
    );
  }
}

export default PostWithComments;
