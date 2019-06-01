import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";
import Book from "./Book";
import Character from "./Character";
import House from "./House";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="restaurants restaurants--wrapper">
            {/* Route for the restaurant list page. The count params is updated on the page itself */}
            <Route exact path="/" component={Home} />
          </div>
          <Route exact path="/book" component={Book} />
          <Route exact path="/character" component={Character} />
          <Route exact path="/house" component={House} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
