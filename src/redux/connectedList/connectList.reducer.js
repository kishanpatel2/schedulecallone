import connectListActionTypes from "./connectList.types";

const INITIAL_STATE = {
    data: []
}

const connectionsListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case connectListActionTypes.GET_CONNECTION_LIST:
            return state
        case connectListActionTypes.SET_CONNECTION_LIST:
            return {
                ...state,
                data : action.payload,
            }
        default:
            return state
    }
}

export default connectionsListReducer