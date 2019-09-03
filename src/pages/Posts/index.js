import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom";

import "./style.scss";
import CG from "home/utils/CG";
import Header from "home/components/Header";
import Post from "home/components/Post";
import PostRepository from "home/models/Posts/PostRepository";

/** Страница для просмотра всех постов */

class Posts extends Component {
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "posts");
    this.onFetch = this.onFetch.bind(this);
    this.onGeneratePosts = this.onGeneratePosts.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.postRefs = [];

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.onFetch();
  }

  getPerPage() {
    return Number(window.localStorage.getItem("perPage"));
  }

  setPerPage(perPage) {
    window.localStorage.setItem("perPage", perPage);
  }

  onFetch() {
    let perPage = this.getPerPage();

    if (!perPage) {
      perPage = 10;
      this.setPerPage(perPage);
    }

    let response = PostRepository.getCollection(perPage);
    this.setState(
      {
        posts: response.data,
        total: response.total
      },
      () => {
        //Проскролить страницу до нужной записи, если вернулись со страницы просмотра поста
        const locationState = this.props.location.state;
        if (!locationState || !locationState.postId) {
          return;
        }
        const container = ReactDOM.findDOMNode(this.refs.container);
        const element = ReactDOM.findDOMNode(this.refs[locationState.postId]);

        if (element) {
          container.scroll(0, element.offsetTop - 150);
        }
      }
    );
  }

  onGeneratePosts() {
    PostRepository.generate(30, 5);
    this.onFetch();
  }

  onScroll(e) {
    if (this.state.posts.length >= this.state.total) {
      return;
    }
    let container = e.target;
    let reachedBottom =
      container.clientHeight + container.scrollTop >
      container.scrollHeight - 50;

    if (reachedBottom) {
      let currentPerPage = this.getPerPage();
      let newPerPage = currentPerPage + 5;
      this.setPerPage(newPerPage);
      this.onFetch();
    }

    return;
  }

  onGoToPost(id) {
    this.props.history.push(`/post/${id}`);
  }

  renderContent() {
    return this.state.posts.map(item => (
      <Post
        ref={item.id}
        id={item.id}
        key={item.id}
        name={item.name}
        description={item.shortDescription}
        count={item.comments.length}
        onGoToPost={this.onGoToPost.bind(this, item.id)}
        linkToEdit={`/edit/${item.id}`}
      />
    ));
  }

  onGoTo(to) {
    this.props.history.push(to);
  }

  renderEmpty() {
    return (
      <div className={this.CG("empty-block")}>
        <div className={this.CG("empty-title")}>
          В этом блоге еще нет записей
        </div>
        <div className={this.CG("empty-text")}>
          Создайте новый пост или сгенерируйте
        </div>
        <div className={this.CG("empty-btns")}>
          <button onClick={this.onGoTo.bind(this, "/edit")}>
            Создать пост
          </button>
          <button onClick={this.onGeneratePosts}>Сгенерировать</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.CG()}>
        <Header title="Все записи" />
        <div
          className={this.CG("container")}
          ref="container"
          onScroll={this.onScroll}
        >
          {this.state.posts.length > 0
            ? this.renderContent()
            : this.renderEmpty()}
        </div>
      </div>
    );
  }
}

export default withRouter(Posts);
