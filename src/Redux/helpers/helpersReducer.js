import { SHOW_PASSWORD, SET_LOADING, SET_ACTIVE_STEP } from "./helpersTypes";

const initialState = {
  password_visible: false,
  loading: false,
  activeStep: 0,
};

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PASSWORD:
      return { ...state, password_visible: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ACTIVE_STEP:
      return { ...state, activeStep: action.payload };
   
    default:
      return state;
  }
};

export default helperReducer;
