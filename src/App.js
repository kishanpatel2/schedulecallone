import "./App.css";
import Header from "./components/Header/Header";
import {Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddProduct from "./pages/AddProduct/AddProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import UserList from "./pages/UserList/UserList";
import Connection from "./pages/Connection/Connection";
import ConnectionList from "./pages/ConnectionList/ConnectionList";
import Appointments from "./pages/Appointments/Appointments";
import { PrivateRoute } from "./components/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, setLocallyStored } from "./redux/Authentication/auth.actions";

function App() {

    const authData = useSelector(state => state.authState.data)
    const dispatch = useDispatch()

    useEffect(() => {
        // Whenever our application loads check if user data is inside the localstoragr
        // If there is, then simply update our redux state with that data
        // This way a logged in user cannot access login or register page
        // You can see the conditions below that prevent this
        if(localStorage.getItem('user-info')){
            dispatch(setAuthData(JSON.parse(localStorage.getItem('user-info'))))
            dispatch(setLocallyStored(true))
        }
    }, [])

  return (
    <div className="App">
        <Header />
        <Switch>

            {/* These are the conditions */}
            {
                authData ? '' 
                : <Route path="/login" component={Login} />
            }

            {
                authData ? '' 
                : <Route path="/register" component={Register} />
            }
                        
            <PrivateRoute exact path="/connect" component={Connection} />
            <PrivateRoute exact path="/add" component={AddProduct} />
            <PrivateRoute exact path="/clist" component={ConnectionList} />
            <PrivateRoute exact path="/appointments" component={Appointments} />
            <PrivateRoute exact path="/update" component={UpdateProduct} />
            <PrivateRoute exact path="/userlist" component={UserList} />

            <Redirect from="*" to="/add"/>

            {/* Old Code, See for youself which is better */}

            {/*
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/connect">
                    <Protected Cmp={Connection} />
                    
                </Route>
                <Route path="/add">
                    <Protected Cmp={AddProduct} />
                    
                </Route>
                <Route path="/clist">
                    <Protected Cmp={ConnectionList} />
                    
                </Route>
                <Route path="/appointments">
                    <Protected Cmp={Appointments} />
                    
                </Route>
                <Route path="/update">
                    <Protected Cmp={UpdateProduct} />
                </Route>
                <Route path="/userlist">
                    <Protected Cmp={UserList} />
                </Route>
            */}
        </Switch>
    </div>
  );
}

export default App;
