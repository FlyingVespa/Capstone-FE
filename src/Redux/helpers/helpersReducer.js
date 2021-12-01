import {
  SHOW_PASSWORD,
  SET_LOADING,
  SET_ACTIVE_STEP,
  SET_LOGGEDIN_STATUS,
  SET_PRODUCT_MODAL,
} from "./helpersTypes";

const initialState = {
  password_visible: false,
  loading: false,
  activeStep: 0,
  loggedin: false,
  productModal: false,
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
    case SET_PRODUCT_MODAL:
      return { ...state, productModal: action.payload };
    default:
      return state;
  }
};

export default helperReducer;
