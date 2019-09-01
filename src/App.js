import { Route, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import React, { Component } from "react";

import "./App.scss";
import CG from "home/utils/CG";
import NotFound from "home/components/NotFound";
import PostEdit from "home/pages/PostEdit";
import Posts from "home/pages/Posts";
import PostView from "home/pages/PostView";

const LINKS = [
  { name: "Главная", to: "/" },
  { name: "Создать пост", to: "/edit" }
];

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        <nav className={CG("panel")}>
          {LINKS.map(link => {
            return (
              <Link
                key={link.to}
                className={CG("panel", "link", [
                  this.props.location.pathname == link.to ? "active" : ""
                ])}
                to={link.to}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="page">
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/post/id" component={PostView} />
            <Route path="/edit/:id?" component={PostEdit} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
