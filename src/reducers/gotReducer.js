import {
  FETCH_GOT_CHARACTERS,
  FETCH_GOT_BOOKS,
  FETCH_GOT_HOUSES
} from "../actions/types";

export default (
  state = { character: null, books: null, houses: null },
  action
) => {
  switch (action.type) {
    case FETCH_GOT_CHARACTERS:
      return { ...state, character: action.payload };
    case FETCH_GOT_BOOKS:
      return { ...state, books: action.payload };
    case FETCH_GOT_HOUSES:
      return { ...state, houses: action.payload };
    default:
      return state;
  }
};
