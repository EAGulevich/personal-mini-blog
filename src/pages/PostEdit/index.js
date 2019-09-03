import React, { Component } from "react";
import { withRouter } from "react-router";

import "./style.scss";
import CG from "home/utils/CG";
import Comment from "home/components/Comment";
import Error from "home/components/Error";
import Header from "home/components/Header";
import PostRepository from "home/models/Posts/PostRepository";

const READY = "ready";
const ADDED = "added";

/** Страница для редактирования/создания поста */

class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "post-edit");
    this.onAddPost = this.onAddPost.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
    this.onDeletePost = this.onDeletePost.bind(this);
    this.onFetchComments = this.onFetchComments.bind(this);
    this.onSavePost = this.onSavePost.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      model: null,
      mode: READY
    };
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.setState({
        model: PostRepository.create()
      });
    });

    let model;

    if (this.props.match.params.id) {
      model = PostRepository.get(this.props.match.params.id);
    } else {
      model = PostRepository.create();
    }

    this.setState({
      model
    });
  }

  onFetchComments() {
    let model = JSON.parse(JSON.stringify(this.state.model));
    model.comments = PostRepository.getComments(this.props.match.params.id);
    this.setState({
      model
    });
  }

  onChange(field, e) {
    let model = JSON.parse(JSON.stringify(this.state.model));
    model[field] = e.target.value;
    this.setState({
      model
    });
  }

  onAddPost() {
    try {
      PostRepository.addPost(this.state.model);
      this.setState({
        mode: ADDED,
        errors: null
      });
    } catch (e) {
      const errors = JSON.parse(e.message);
      this.setState({
        errors
      });
    }
  }

  onSavePost() {
    try {
      PostRepository.save(this.state.model);
      this.props.history.push("/", { postId: this.state.model.id });
    } catch (e) {
      const errors = JSON.parse(e.message);
      this.setState({
        errors
      });
    }
  }

  onDeletePost() {
    PostRepository.delete(this.state.model.id);
    this.props.history.push("/");
  }

  onDeleteComment(id) {
    PostRepository.deleteComment(this.state.model.id, id);
    this.onFetchComments();
  }

  renderButtons(isEditing) {
    if (isEditing) {
      return (
        <>
          <button onClick={this.onSavePost}>Сохранить пост</button>
          <button onClick={this.onDeletePost}>Удалить этот пост</button>
        </>
      );
    } else {
      return <button onClick={this.onAddPost}>Добавить запись</button>;
    }
  }

  renderForm(isEditing) {
    return (
      <div className={this.CG("form")}>
        <label>Заголовок</label>
        <Error error={this.state.errors && this.state.errors.name} />
        <input
          onChange={this.onChange.bind(this, "name")}
          value={this.state.model.name}
        />
        <label>Краткое описание</label>
        <Error
          error={this.state.errors && this.state.errors.shortDescription}
        />
        <textarea
          className={this.CG("textarea")}
          onChange={this.onChange.bind(this, "shortDescription")}
          value={this.state.model.shortDescription}
        />
        <label>Полное описание</label>
        <Error error={this.state.errors && this.state.errors.description} />
        <textarea
          className={this.CG("textarea", ["big"])}
          onChange={this.onChange.bind(this, "description")}
          value={this.state.model.description}
        />

        <div className={this.CG("btns")}>{this.renderButtons(isEditing)}</div>
      </div>
    );
  }

  renderComments() {
    return (
      <div className={this.CG("comments")}>
        {this.state.model.comments.map(comment => {
          return (
            <div className={this.CG("comment")} key={comment.id}>
              <Comment author={comment.author} text={comment.text} />
              <button onClick={this.onDeleteComment.bind(this, comment.id)}>
                Удалить комментарий
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  renderSuccessMessage() {
    return (
      <div className={this.CG("succes-msg")}>
        <h1 className={this.CG("succes-msg-title")}>Пост создан успешно</h1>
        <button
          onClick={() => {
            this.setState({
              model: PostRepository.create(),
              mode: READY
            });
          }}
        >
          Создать ещё
        </button>
      </div>
    );
  }

  render() {
    if (!this.state.model) {
      return null;
    }

    let isEditing = !!this.props.match.params.id;

    return (
      <div className={this.CG()}>
        <Header
          title={isEditing ? "Редактирование поста" : "Создание поста"}
          onGoToBack={
            isEditing
              ? this.props.history.push.bind(this, "/", {
                  postId: this.props.match.params.id
                })
              : null
          }
        />
        <div className={this.CG("container")}>
          {this.state.mode === READY && this.renderForm(isEditing)}
          {this.state.mode === ADDED && this.renderSuccessMessage()}
          {this.renderComments()}
        </div>
      </div>
    );
  }
}

export default withRouter(PostEdit);
