import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import productReducer from "./products/productReducer";
import helperReducer from "./helpers/helpersReducer";

const rootReducer = combineReducers({
  product: productReducer,
  users: userReducer,
  helper: helperReducer
});

export default rootReducer;
