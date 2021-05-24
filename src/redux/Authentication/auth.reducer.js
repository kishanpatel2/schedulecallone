import AuthActionTypes from "./auth.types";

let user = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info')) :''

const INITIAL_STATE = {
    loggedIn : !!user,
    data : user ? user : null,
    locallyStored: false,
    login_request: false
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthActionTypes.GET_AUTH_DATA:
            return state
        case AuthActionTypes.SET_AUTH_DATA:
            return {
                ...state,
                data : action.payload,
            }
        case AuthActionTypes.SET_LOCALLY_STORED_DATA:
            return {
                ...state,
                locallyStored: action.payload
            }
        case AuthActionTypes.SET_LOGIN_REQUEST:
            return {
                ...state,
                login_request: !state.login_request
            }
        default:
            return state
    }
}

export default authReducer