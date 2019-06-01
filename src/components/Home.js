import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGOTBooks, fetchGOTHouses } from "../actions";

import Books from "./Books";
import Houses from "./Houses";

class Home extends Component {
  state = {
    housesId: 1,
    booksId: 1,
    housesNameFilter: null,
    housesRegionFilter: null,
    booksFilter: null,
    pagesFilter: 0
  };
  componentDidMount() {
    this.props.fetchGOTBooks(this.state.booksId);
    this.props.fetchGOTHouses(`?page=${this.state.housesId}`);
  }

  decrementBooks = () => {
    let count = this.state.booksId;
    count--;
    this.setState({ booksId: count });
    this.props.fetchGOTBooks(count);
  };

  incrementBooks = () => {
    let count = this.state.booksId;
    count++;
    this.setState({ booksId: count });
    this.props.fetchGOTBooks(count);
  };

  renderBooks = () => {
    let arr = [];
    if (this.props.books) {
      for (let book of this.props.books) {
        if (book.numberOfPages > this.state.pagesFilter) {
          arr.push(
            <Books title={book.name} released={book.released} url={book.url} />
          );
        }
      }
    }
    return arr;
  };

  decrementHouses = () => {
    let count = this.state.housesId;
    count--;
    this.setState({ housesId: count });
    this.props.fetchGOTHouses(count);
  };

  incrementHouses = () => {
    let count = this.state.housesId;
    count++;
    this.setState({ housesId: count });
    this.props.fetchGOTHouses(count);
  };

  renderHouses = () => {
    let arr = [];
    if (this.props.houses) {
      for (let house of this.props.houses) {
        arr.push(
          <Houses name={house.name} region={house.region} url={house.url} />
        );
      }
    }
    return arr;
  };

  handleChangeBook = event => {
    this.setState({ booksFilter: event.target.value });
    this.setState({ booksId: 1 });
    this.props.fetchGOTBooks(
      this.state.booksId,
      `fromReleaseDate=${event.target.value}`
    );
  };

  handleHousesNameSubmit = e => {
    e.preventDefault();
    this.props.fetchGOTHouses(null, `name=${this.state.housesNameFilter}`);
    this.setState({ housesNameFilter: null });
  };

  handleHousesRegionSubmit = e => {
    e.preventDefault();
    this.props.fetchGOTHouses(
      null,
      null,
      `region=${this.state.housesRegionFilter}`
    );
    this.setState({ housesRegionFilter: null });
  };

  render() {
    return (
      <div className="home">
        <div className="home__books">
          <div className="home__header">
            <button
              className="home__button"
              onClick={this.decrementBooks}
              disabled={this.state.booksId === 1 ? true : false}
            >
              &#60;
            </button>
            <h2>Books</h2>

            <button className="home__button" onClick={this.incrementBooks}>
              &#62;
            </button>
          </div>
          <label for="filterDate">Released After</label>
          <input
            type="date"
            name="filterDate"
            onChange={this.handleChangeBook}
          />
          <label for="filterNumber">Minimum # of Pages</label>
          <input
            type="number"
            name="filterNumber"
            onChange={event =>
              this.setState({ pagesFilter: event.target.value })
            }
            onSubmit={console.log("hey")}
          />
          <div className="home__list">{this.renderBooks()}</div>
        </div>

        <div className="home__houses">
          <div className="home__header">
            <button
              className="home__button"
              onClick={this.decrementHouses}
              disabled={this.state.housesId === 1 ? true : false}
            >
              &#60;
            </button>
            <h2>Houses</h2>
            <button className="home__button" onClick={this.incrementHouses}>
              &#62;
            </button>
          </div>
          <label for="filterHouseName">Name</label>
          <form onSubmit={this.handleHousesNameSubmit}>
            <input
              type="text"
              name="filterHouseName"
              display={this.state.housesNameFilter}
              onChange={event =>
                this.setState({ housesNameFilter: event.target.value })
              }
            />
          </form>
          <label for="filterHouseRegion">Region</label>
          <form onSubmit={this.handleHousesRegionSubmit}>
            <input
              type="text"
              name="filterHouseRegion"
              onChange={event =>
                this.setState({ housesRegionFilter: event.target.value })
              }
            />
          </form>
          <div className="home__list">{this.renderHouses()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.got.books,
    houses: state.got.houses
  };
};

export default connect(
  mapStateToProps,
  { fetchGOTBooks, fetchGOTHouses }
)(Home);
