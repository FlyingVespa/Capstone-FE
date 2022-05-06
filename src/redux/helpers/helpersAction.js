import {
  SHOW_PASSWORD,
} from "./helpersTypes";

export const showPassword = (password) => {
  return {
    type: SHOW_PASSWORD,
    payload: password,
  };
};
