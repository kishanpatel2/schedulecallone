import { services } from "../../services/services";
import AuthActionTypes from "./auth.types";


export const setAuthData = data => ({
    type: AuthActionTypes.SET_AUTH_DATA,
    payload: data
})

export const getAuthData = () => ({
    type: AuthActionTypes.GET_AUTH_DATA
})


export const setLocallyStored = data => ({
    type: AuthActionTypes.SET_LOCALLY_STORED_DATA,
    payload: data
})

export const setLoginRequest = () => ({
    type: AuthActionTypes.SET_LOGIN_REQUEST,
})

export const loginUser = formData => {
    return dispatch => {
        dispatch(setLoginRequest())
    
        services.login(formData)
                .then(result => {
                    localStorage.setItem("user-info",JSON.stringify(result))
                    // Store the received data from server into our Redux Reducer as well
                    dispatch(setAuthData(result))
                    dispatch(setLocallyStored(true))
                })
    }
}

export const registerUser = (formData) =>{
    return dispatch => {

        services.register(formData)
            .then(result => {
                localStorage.setItem("user-info",JSON.stringify(result))
                    
                // Store the received data from server into our Redux Reducer as well
                dispatch(setAuthData(result))
                dispatch(setLocallyStored(true))
            });
    };
}