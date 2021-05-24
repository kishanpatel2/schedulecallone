import appointmentActionsTypes from "./appoint.types";

let user = JSON.parse(localStorage.getItem('user-info'));

const INITIAL_STATE = {
    data: [],
}

const appointmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appointmentActionsTypes.GET_APPOINTMENTS:
            return state
        case appointmentActionsTypes.SET_APPOINTMENTS_DATA:
            return {
                ...state,
                data : action.payload,
            }
        default:
            return state
    }
}

export default appointmentReducer