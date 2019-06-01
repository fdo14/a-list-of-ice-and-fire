import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Characters from "./Characters";

class House extends Component {
  state = { houseInfo: null, characters: [], filter: null };

  componentDidMount() {
    axios
      .get(this.props.location.state.url)
      .then(res => this.setState({ houseInfo: res.data }));
  }

  fetchCharacters() {
    if (this.state.characters.length < 1) {
      for (let character of this.state.houseInfo.swornMembers) {
        axios
          .get(character)
          .then(res =>
            this.setState({ characters: [...this.state.characters, res.data] })
          );
      }
    }
  }

  renderCharacters() {
    let arr = [];
    if (this.state.characters.length) {
      for (let character of this.state.characters) {
        if (
          character.gender.toLowerCase().includes(this.state.filter) ||
          character.culture.toLowerCase().includes(this.state.filter) ||
          !this.state.filter
        ) {
          arr.push(
            <Characters
              name={character.name}
              culture={character.culture}
              url={character.url}
            />
          );
        }
      }
    }
    return arr;
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    if (this.state.houseInfo) {
      this.fetchCharacters();
      return (
        <div className="book">
          <Link to="/" className="book__back">
            {" "}
            &#171;
          </Link>
          <div className="book__container">
            <h1 className="book__title">{this.state.houseInfo.name}</h1>
            <h3>{this.state.houseInfo.swornMembers.length} Members</h3>
            <h5 className="book__pages">{this.state.houseInfo.words}</h5>
            <h4 className="book__title">Sworn Members</h4>
            <br />
            <input
              type="text"
              value={this.state.filter}
              placeholder="Filter"
              onChange={this.handleChange}
            />
            <div className="book__character">{this.renderCharacters()}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default House;
