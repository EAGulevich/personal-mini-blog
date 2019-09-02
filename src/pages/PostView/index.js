import React, { Component } from "react";
import { withRouter } from "react-router";

import "./style.scss";
import CG from "home/utils/CG";
import Header from "home/components/Header";
import PostRepository from "home/models/Posts/PostRepository";
import PostWithComments from "home/components/PostWithComments";

/** Страница для просмотра конкретного поста с возможностью оставлять комментарии */

class PostView extends Component {
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "post-view");
    this.onAddComment = this.onAddComment.bind(this);
    this.onFetch = this.onFetch.bind(this);

    this.state = {
      model: null
    };
  }

  componentDidMount() {
    this.onFetch();
  }

  onFetch() {
    let id = this.props.match.params.id;
    let model = PostRepository.get(id);
    this.setState({
      model
    });
  }

  onAddComment(author, text) {
    let id = this.props.match.params.id;
    let comment = {
      author,
      text
    };
    PostRepository.addComment(id, comment);
    this.onFetch();
  }

  render() {
    if (!this.state.model) {
      return null;
    }
    return (
      <div className={this.CG()}>
        <Header
          title="Просмотр поста"
          onGoToBack={this.props.history.push.bind(this, "/", {
            postId: this.props.match.params.id
          })}
        />
        <div className={this.CG("container")}>
          <PostWithComments
            onAddComment={this.onAddComment}
            model={this.state.model}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PostView);
