import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import productReducer from "./products/productReducer";

const rootReducer = combineReducers({
  product: productReducer,
  users: userReducer,
});

export default rootReducer;
