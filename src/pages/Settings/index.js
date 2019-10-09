import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom";

import "./style.scss";
import CG from "home/utils/CG";
import Header from "home/components/Header";
import PostRepository from "home/models/Posts/PostRepository";
import Dialog from "home/components/Dialog";

/** Страница Настройки */

class Settings extends Component {
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "settings");

    this.renderDeleteDialog = this.renderDeleteDialog.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);

    this.state = {
      totalPosts: undefined
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    let response = PostRepository.getCollection();
    this.setState({
      totalPosts: response.total
    });
  }

  renderDeleteDialog() {
    const closeDialog = () => {
      ReactDOM.render(null, document.getElementById("modal"));
    };

    const dialogConfig = {
      title: "Вы уверены, что хотите удалить все посты?",
      description:
        "Все посты удалятся навсегда. Вы не сможете отменить это действие.",
      buttons: [
        {
          name: "Удалить",
          onClick: () => {
            this.onDeleteAllPosts();
            this.fetchPosts();
            closeDialog();
          }
        },
        {
          name: "Отмена",
          onClick: closeDialog
        }
      ]
    };

    ReactDOM.render(
      <Dialog {...dialogConfig} />,
      document.getElementById("modal")
    );
  }

  onDeleteAllPosts() {
    PostRepository.deleteAllPosts();
  }

  render() {
    return (
      <div className={this.CG()}>
        <Header title="Настройки" />
        <div className={this.CG("container")}>
          <button
            disabled={this.state.totalPosts === 0}
            title={this.state.totalPosts === 0 ? "Постов нет" : ""}
            onClick={this.renderDeleteDialog}
          >
            Удалить все посты
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Settings);
