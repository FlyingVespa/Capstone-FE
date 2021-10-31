import {SHOW_PASSWORD} from "./helpersTypes"

const initialState ={
    password_visible:false,
}

const helperReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_PASSWORD:
            return {...state, password_visible: action.payload}
           default: return state
    }
}

export default helperReducer;