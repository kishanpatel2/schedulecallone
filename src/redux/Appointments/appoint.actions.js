import appointmentActionsTypes from "./appoint.types";
import { services } from "../../services/services";

export const setAppointments = data => ({
    type: appointmentActionsTypes.SET_APPOINTMENTS_DATA,
    payload: data
})

export const getAppointments = () => ({
    type: appointmentActionsTypes.GET_APPOINTMENTS,
})


export const getAppointmentsFromAPI = (userid) => {
    return (dispatch) => {
        services.getAppointments(userid)
            .then(result => {
                // Store the received data from server into our Redux Reducer as well
                dispatch(setAppointments(result))
            });
    }
}

export const updateAppointment = (data) => {
    return (dispatch) => {
        services.updateAppointment(data)
    }
}