import connectListActionTypes from "./connectList.types";
import { services } from "../../services/services";

export const setConnectionsList = data => ({
    type: connectListActionTypes.SET_CONNECTION_LIST,
    payload: data
})

export const getConnectionsList = () => ({
    type: connectListActionTypes.GET_CONNECTION_LIST,
})


export const getConnectionsListFromAPI = (data) => {
    return (dispatch) => {
        services.getConnectionsList(data)
            .then(result => {
                // Store the received data from server into our Redux Reducer as well
                dispatch(setConnectionsList(result))
            });
    }
}

export const makeAppointment = (data) => {
    return (dispatch) => {
        services.makeAppointment(data)
    }
}