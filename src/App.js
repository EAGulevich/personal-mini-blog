import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import React, { Component } from "react";

import "./App.scss";
import NotFound from "home/components/NotFound";
import PostEdit from "home/pages/PostEdit";
import Posts from "home/pages/Posts";
import PostView from "home/pages/PostView";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Personal mini-blog!</h1>

        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Posts</Link>
              </li>
              <li>
                <Link to="/post/7">PostView</Link>
              </li>
              <li>
                <Link to="/edit">PostEdit</Link>
              </li>
              <li>
                <Link to="/dsafdsfa">NotFound</Link>
              </li>
            </ul>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/post/id" component={PostView} />
              <Route path="/edit/:id?" component={PostEdit} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
