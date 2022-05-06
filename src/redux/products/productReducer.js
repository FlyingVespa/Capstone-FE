import { FETCH_ALL_PRODUCTS } from "./productTypes";

const intitialState = {
  allProducts: "",
};

const productReducer = (state = intitialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    default:
      return state;
  }
};

export default productReducer;
