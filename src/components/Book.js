import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGOTBooks } from "../actions";
import { Link } from "react-router-dom";
import axios from "axios";

import Characters from "./Characters";

class Book extends Component {
  state = { bookInfo: null, characters: [] };

  componentDidMount() {
    axios
      .get(this.props.location.state.url)
      .then(res => this.setState({ bookInfo: res.data }));
  }

  fetchCharacters() {
    if (this.state.characters.length < 1) {
      for (let character of this.state.bookInfo.povCharacters) {
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
        arr.push(
          <Characters
            name={character.name}
            culture={character.culture}
            url={character.url}
            gender={character.gender}
          />
        );
      }
    }
    return arr;
  }

  render() {
    if (this.state.bookInfo) {
      this.fetchCharacters();
      return (
        <div className="book">
          <Link to="/" className="book__back">
            {" "}
            &#171;
          </Link>
          <div className="book__container">
            <h1 className="book__title">{this.state.bookInfo.name}</h1>
            <h3>{this.state.bookInfo.released}</h3>
            <h5 className="book__pages">
              {this.state.bookInfo.numberOfPages} Pages
            </h5>
            <h4 className="book__title">Characters</h4>
            <div className="book__character">{this.renderCharacters()}</div>
          </div>
        </div>
      );
    } else return <div />;
  }
}

const mapStateToProps = state => {
  return {
    books: state.got.books
  };
};

export default connect(
  mapStateToProps,
  { fetchGOTBooks }
)(Book);
