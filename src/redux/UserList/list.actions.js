import listActionTypes from "./list.types";
import { services } from "../../services/services";

export const setUsersList = data => ({
    type: listActionTypes.SET_USERS_LIST,
    payload: data
})

export const getUsersList = () => ({
    type: listActionTypes.GET_USERS_LIST,
})


export const getUsersFromAPI = () => {
    return (dispatch) => {
        services.getUsersList()
            .then(result => {
                // Store the received data from server into our Redux Reducer as well
                dispatch(setUsersList(result))
            });
    }
}

export const connectUser = (data) => {
    return (dispatch) => {
        services.connectUser(data)
    }
}