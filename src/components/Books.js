import React, { Component } from "react";
import { Link } from "react-router-dom";

class Books extends Component {
  render() {
    let d = new Date(this.props.released);
    return (
      <div className="books">
        <div className="books__content">
          <p className="books__title">{this.props.title}</p>
          <Link
            to={{
              pathname: "/book",
              state: {
                url: this.props.url
              }
            }}
            className="books__image"
          >
            &#128214;
          </Link>
          <p className="books__released">{d.getFullYear()}</p>
        </div>
      </div>
    );
  }
}

export default Books;
