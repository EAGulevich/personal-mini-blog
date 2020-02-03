import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom";
import { map } from "lodash";

import "./style.scss";
import CG from "home/utils/CG";
import Header from "home/components/Header";
import PostRepository from "home/models/Posts/PostRepository";
import Dialog from "home/components/Dialog";
import { THEMES } from "home/constants/themes";
import setTheme from "home/utils/setTheme";

/** Страница Настройки */

class Settings extends Component {
  constructor(props) {
    super(props);

    this.CG = CG.bind(this, "settings");

    this.renderDeleteDialog = this.renderDeleteDialog.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.onChangeTheme = this.onChangeTheme.bind(this);

    this.state = {
      totalPosts: undefined,
      currentTheme: window.localStorage.getItem("theme")
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

  onChangeTheme(theme) {
    setTheme(theme);

    this.setState({
      currentTheme: theme
    });
  }

  renderThemeSwitcher() {
    return (
      <div className={this.CG("box")}>
        <div className={this.CG("box-title")}>Тема:</div>
        {map(THEMES, theme => {
          return (
            <div
              key={theme.value}
              onClick={this.onChangeTheme.bind(this, theme.value)}
              className={this.CG("theme-item")}
            >
              {this.state.currentTheme == theme.value && "✔ "} {theme.title}
            </div>
          );
        })}
      </div>
    );
  }

  renderPostManagement() {
    return (
      <div className={this.CG("box")}>
        <div className={this.CG("box-title")}>Управление постами:</div>
        <button
          disabled={this.state.totalPosts === 0}
          title={this.state.totalPosts === 0 ? "Постов нет" : ""}
          onClick={this.renderDeleteDialog}
        >
          Удалить все посты
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className={this.CG()}>
        <Header title="Настройки" />
        <div className={this.CG("container")}>
          {this.renderThemeSwitcher()}
          {this.renderPostManagement()}
        </div>
      </div>
    );
  }
}

export default withRouter(Settings);
