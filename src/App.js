import { Route, Link, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import React, { Component, Suspense, lazy } from "react";
import SVGInline from "react-svg-inline";

import "./App.scss";
import CG from "home/utils/CG";
import NotFound from "home/components/NotFound";
import LinkConfig from "./linkConfig";
import setTheme from "home/utils/setTheme";
import { THEMES } from "home/constants/themes";
const Posts = lazy(() =>
  import(/* webpackPrefetch: true */ "home/pages/Posts")
);
const PostEdit = lazy(() =>
  import(/* webpackPrefetch: true */ "home/pages/PostEdit")
);
const Settings = lazy(() =>
  import(/* webpackPrefetch: true */ "home/pages/Settings")
);
const Stats = lazy(() =>
  import(/* webpackPrefetch: true */ "home/pages/Stats")
);
const PostView = lazy(() =>
  import(/* webpackPrefetch: true */ "home/pages/PostView")
);

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
          <Suspense fallback={<div>Загрузка...</div>}>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/post/:id?" component={PostView} />
              <Route path="/edit/:id?" component={PostEdit} />
              <Route path="/settings" component={Settings} />
              <Route path="/stats" component={Stats} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
