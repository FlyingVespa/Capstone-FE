import {
  SHOW_PASSWORD,
  CLOSE_PRODUCT_MODAL,
  OPEN_PRODUCT_MODAL,
} from "./helpersTypes";

export const showPassword = (password) => {
  return {
    type: SHOW_PASSWORD,
    payload: password,
  };
};
