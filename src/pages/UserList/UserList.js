import Header from "../../components/Header/Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, ButtonToolBar } from "react-bootstrap";
import PopUp from "../../components/PopUp/PopUp";
import Select from "react-select";
import Modal from "../../components/Modal/Modal";
import moment from "moment";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { browserHistory } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectUser, getUsersFromAPI } from "../../redux/UserList/list.actions";

//import "./styles.css";

function UserList() {
    const history = useHistory();
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const data = useSelector(state => state.usersList.data)
    const authData = useSelector(state => state.authState.data)
    const [selectedDate, setSelectedDate] = useState(null);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const connect = (user_b) => {
        const user_a = authData.id;
        let apiData = { user_b, user_a };

        dispatch(connectUser(apiData))

        alert("Connected Successfully");
        history.push("/clist");
    }


    useEffect(async () => {
        dispatch(getUsersFromAPI())        
    }, []);
  
  return (
    <div>
    <h1>All Users</h1>

    <Table>
        <tr>
        <td>Name</td>
        <td>Email</td>
        </tr>
        {data ?
            data.map((item) => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                    <button
                        onClick={() => connect(item.id)}
                        id={item.id}
                        renderAs="button"
                    >
                        Connect
                    </button>
                    </td>
                </tr>
            )) : ''
        }
    </Table>

    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        Connect With:
        { data ? data.map((item) => (
        <tr>
            <td>{item.name}</td>
            <td></td>
            <td>{item.email}</td>

            <Link to="/update">
            <Button renderAs="button">
                <span>Connect</span>
            </Button>
            </Link>
        </tr>
        )) : ''}
        <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={new Date()}
        />
    </Modal>
    </div>
  );
}

export default UserList;
