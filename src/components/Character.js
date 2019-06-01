import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { array } from "prop-types";
import Houses from "./Houses";

class Character extends Component {
  state = { charInfo: null, houses: [] };

  componentDidMount() {
    axios
      .get(this.props.location.state.url)
      .then(res => this.setState({ charInfo: res.data }));
  }

  fetchHouses() {
    if (this.state.houses.length < 1) {
      for (let house of this.state.charInfo.allegiances) {
        axios
          .get(house)
          .then(res =>
            this.setState({ houses: [...this.state.houses, res.data] })
          );
      }
    }
  }

  renderHouses() {
    let arr = [];
    if (this.state.houses.length) {
      for (let house of this.state.houses) {
        arr.push(
          <Houses name={house.name} region={house.region} url={house.url} />
        );
      }
    }
    return arr;
  }

  render() {
    if (this.state.charInfo) {
      this.fetchHouses();
      console.log(this.state);

      return (
        <div className="book">
          <Link to="/" className="book__back">
            {" "}
            &#171;
          </Link>
          <div className="book__container">
            <h1 className="book__title">{this.state.charInfo.name}</h1>
            {this.state.charInfo.gender === "Male" && <p>&#128104;</p>}
            {this.state.charInfo.gender !== "Male" && <p>&#128105;</p>}
            <h3>{this.state.charInfo.culture}</h3>
            <br />
            <h5 className="book__pages">Allegiances</h5>
            {this.renderHouses()}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Character;
