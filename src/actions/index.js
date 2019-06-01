import axios from "axios";

import {
  FETCH_GOT_CHARACTERS,
  FETCH_GOT_BOOKS,
  FETCH_GOT_HOUSES
} from "./types";

export const fetchGOTCharacters = () => async dispatch => {
  axios
    .get("https://www.anapioficeandfire.com/api/characters")
    .then(res => dispatch({ type: FETCH_GOT_CHARACTERS, payload: res.data }));
};

export const fetchGOTBooks = (id, filter) => async dispatch => {
  axios
    .get(`https://www.anapioficeandfire.com/api/books?page=${id}&${filter}`)
    .then(res => dispatch({ type: FETCH_GOT_BOOKS, payload: res.data }));
};

export const fetchGOTHouses = (id, name, region) => async dispatch => {
  if (!name && !region) {
    axios
      .get(`https://www.anapioficeandfire.com/api/houses?page=${id}`)
      .then(res => dispatch({ type: FETCH_GOT_HOUSES, payload: res.data }));
    console.log("hi");
  } else {
    axios
      .get(
        `https://www.anapioficeandfire.com/api/houses?&pageSize=50&${name}&${region}`
      )
      .then(res => dispatch({ type: FETCH_GOT_HOUSES, payload: res.data }));
    console.log("bye");
  }
};
