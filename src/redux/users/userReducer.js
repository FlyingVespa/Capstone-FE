import {
  CURRENT_USER_DETAILS,
  CURRENT_CLIENT_DETAILS,
  FETCH_LOGGED_USER_FAILURE,
  FETCH_LOGGED_USER_REQUEST,
  FETCH_LOGGED_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  REGISTER_BUSINESS_USER,
  STORE_TRADING_STATUS,
} from "./userTypes";

const intitialState = {
  users: [],
  loggedin: false,
  loggedUser: {},
  loading: false,
  loadingSingleUser: false,
  error: "",
  registerBusiness: "",
  registerClient: "",
  business: {},
  storeTradingStatus: false,
};

const userReducer = (state = intitialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    case FETCH_LOGGED_USER_REQUEST:
      return { ...state, loadingSingle: true };

    case FETCH_LOGGED_USER_SUCCESS: {
      return {
        loadingSingleUser: false,
        loggedUser: action.payload,
        error: "",
      };
    }
    case FETCH_LOGGED_USER_FAILURE:
      return {
        loadingSingle: false,
        loggedUser: {},
        error: action.payload,
      };
    case REGISTER_BUSINESS_USER:
      return { ...state, registerBusiness: action.payload };

    case CURRENT_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };
    case STORE_TRADING_STATUS:
      return {
        ...state,
        storeTradingStatus: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
