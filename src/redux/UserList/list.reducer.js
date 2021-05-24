import listActionTypes from "./list.types";

let user = JSON.parse(localStorage.getItem('user-info'));

const INITIAL_STATE = {
    data: []
}

const usersListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case listActionTypes.GET_USERS_LIST:
            return state
        case listActionTypes.SET_USERS_LIST:
            return {
                ...state,
                data : action.payload,
            }
        default:
            return state
    }
}

export default usersListReducer