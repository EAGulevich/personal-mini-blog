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
    this.onGeneratePosts = this.onGeneratePosts.bind(this);
    this.onFetch = this.onFetch.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.postRefs = [];

    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.onFetch();
  }

  onFetch() {
    let posts = PostRepository.getCollection();
    this.setState(
      {
        posts
      },
      () => {
        //Проскролить страницу до нужной записи, если вернулись со страницы просмотра поста
        const locationState = this.props.location.state;
        if (locationState && locationState.postId) {
          const container = ReactDOM.findDOMNode(this.refs.container);
          const element = ReactDOM.findDOMNode(this.refs[locationState.postId]);
          container.scroll(0, element.offsetTop - 300);
        }
      }
    );
  }

  onGeneratePosts() {
    PostRepository.generate(30, 5);
    this.onFetch();
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
        link={`/post/${item.id}`}
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
        <div className={this.CG("container")} ref="container">
          {this.state.posts.length > 0
            ? this.renderContent()
            : this.renderEmpty()}
        </div>
      </div>
    );
  }
}

export default withRouter(Posts);
