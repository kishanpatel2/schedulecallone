import { combineReducers } from "redux";
import authReducer from "./Authentication/auth.reducer";
import appointmentReducer from "./Appointments/appoint.reducer";
import usersListReducer from "./UserList/list.reducer";
import connectionsListReducer from "./connectedList/connectList.reducer";


const rootReducer =  combineReducers({
    authState: authReducer,
    appointmentsState : appointmentReducer,
    usersList: usersListReducer,
    connectionsList: connectionsListReducer
});

export default rootReducer