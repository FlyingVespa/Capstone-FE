import { FETCH_ALL_PRODUCTS } from "./productTypes";

export const fetchAllProducts = () => {
  return {
    type: FETCH_ALL_PRODUCTS,
  };
};
