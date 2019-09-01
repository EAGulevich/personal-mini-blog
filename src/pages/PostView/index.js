import React, { Component } from "react";
import { withRouter } from "react-router";

import "./style.scss";
import Header from "home/components/Header";

/** Страница для просмотра конкретного поста с возможностью оставлять комментарии */

class PostView extends Component {
  render() {
    return (
      <div>
        <Header
          title="Просмотр поста"
          onGoToBack={this.props.history.push.bind(this, "/", {
            postId: this.props.match.params.id
          })}
        />
      </div>
    );
  }
}

export default withRouter(PostView);
