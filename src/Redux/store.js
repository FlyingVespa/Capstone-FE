import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./rootReducer";


const persistConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(persistConfig,   rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

const persistor = persistStore(store);

export { store, persistor };
