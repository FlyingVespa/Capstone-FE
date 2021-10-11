import { createStore } from "redux";
import { appReducer } from "./reducers";

const configureStore = createStore(
  appReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;
