import React, { Component } from "react";
import { Link } from "react-router-dom";

class Houses extends Component {
  render() {
    let d = new Date(this.props.released);
    return (
      <div className="homes">
        <div className="homes__content">
          <p className="homes__name">{this.props.name}</p>
          <Link
            to={{
              pathname: "/house",
              state: {
                url: this.props.url
              }
            }}
            className="homes__image"
          >
            &#x1F3F0;
          </Link>
          <p className="homes__region">{this.props.region}</p>
        </div>
      </div>
    );
  }
}

export default Houses;
