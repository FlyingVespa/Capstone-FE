import {
  SHOW_PASSWORD,
  SET_LOADING,
  SET_ACTIVE_STEP,
  SET_LOGGEDIN_STATUS,
  SET_LOGIN_MODAL,
  SET_ADD_MODAL,
  SET_UPDATE_MODAL
} from "./helpersTypes";

const initialState = {
  password_visible: false,
  loading: false,
  activeStep: 0,
  loggedin: false,
  loginModal: false,
  addProductModal: false,
  updateProductModal: false,
};

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PASSWORD:
      return { ...state, password_visible: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ACTIVE_STEP:
      return { ...state, activeStep: action.payload };
    case SET_LOGGEDIN_STATUS:
      return { ...state, loggedin: action.payload };
    case SET_LOGIN_MODAL:
      return { ...state, loginModal: action.payload };
    case SET_ADD_MODAL:
      return { ...state, addProductModal: action.payload };
    case SET_UPDATE_MODAL:
      return { ...state, updateProductModal: action.payload };
    default:
      return state;
  }
};

export default helperReducer;
