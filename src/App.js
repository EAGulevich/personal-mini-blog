import { Route, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import React, { Component } from "react";
import SVGInline from "react-svg-inline";

import "./App.scss";
import CG from "home/utils/CG";
import NotFound from "home/components/NotFound";
import PostEdit from "home/pages/PostEdit";
import Posts from "home/pages/Posts";
import PostView from "home/pages/PostView";
import LinkConfig from "./linkConfig";
import Settings from "home/pages/Settings";
import setTheme from "home/utils/setTheme";
import { THEMES } from "home/constants/themes";
import Stats from "home/pages/Stats";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const currentTheme = window.localStorage.getItem("theme");
    setTheme(currentTheme || THEMES[0].value);
  }

  render() {
    return (
      <div className="app">
        <nav className={CG("panel")}>
          {LinkConfig.map(link => {
            return (
              <Link
                key={link.to}
                className={CG("panel", "link", [
                  this.props.location.pathname == link.to ? "active" : ""
                ])}
                to={link.to}
              >
                <SVGInline
                  className={CG("panel", "link-image")}
                  svg={link.image}
                />
                <span className={CG("panel", "link-name")}> {link.name} </span>
              </Link>
            );
          })}
        </nav>
        <div className="page">
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/post/:id?" component={PostView} />
            <Route path="/edit/:id?" component={PostEdit} />
            <Route path="/settings" component={Settings} />
            <Route path="/stats" component={Stats} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
