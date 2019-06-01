import React, { Component } from "react";
import { Link } from "react-router-dom";

class Characters extends Component {
  render() {
    let d = new Date(this.props.released);
    return (
      <div className="characters">
        <div className="characters__content">
          <p className="characters__name">{this.props.name}</p>
          <Link
            to={{
              pathname: "/character",
              state: {
                url: this.props.url
              }
            }}
            className="characters__image"
          >
            {this.props.gender === "Male" && <p>&#128697;</p>}
            {this.props.gender !== "Male" && <p>&#128698;</p>}
          </Link>
          <p className="characters__culture">{this.props.culture}</p>
        </div>
      </div>
    );
  }
}

export default Characters;
