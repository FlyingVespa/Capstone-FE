import { SHOW_PASSWORD, SET_LOADING } from "./helpersTypes";

export const showPassword = (password) => {
    return {
        type: SHOW_PASSWORD,
        payload: password
    }
}
