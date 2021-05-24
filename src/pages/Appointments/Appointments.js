import React,{useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Modal from '../../components/Modal/Modal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentsFromAPI, updateAppointment } from '../../redux/Appointments/appoint.actions'

function Appointments()
{
    const dispatch = useDispatch()
    const data = useSelector(state => state.appointmentsState.data)
    const authData = useSelector(state => state.authState)

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedID, setselectedId] = useState(null)
    
    function openModel(aid){
        setIsOpen(true);
        
        setselectedId(aid);
        // console.log(selectedID);
      }

    const updateappoint = async () => {
        let sdate= selectedDate;
        let aid= selectedID;

        let updateData={aid,sdate}

        dispatch(updateAppointment(updateData))
        setIsOpen(false);
        setIsUpdated(true)
    }

    useEffect(() => {
        if(authData.data){
            dispatch(getAppointmentsFromAPI(authData.data.id))
        }
    }, [])

    useEffect(() => {
        if(authData.data && isUpdated){
            dispatch(getAppointmentsFromAPI(authData.data.id))
            setIsUpdated(false)
        }
    }, [data, isUpdated])

    return (
        <div>
            <h1>Your Appointments</h1>
            <Table>
                <tbody>
                {
                    data ? data.map((item)=>
                        <tr key={item.id}>
                            <td>{item.a_id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.call_date}</td>
                            {/* <td><button  id={item.id} renderAs="button">Make Appointment</button></td> */}
                            {/* <td><DatePicker selected={selectedDate} onChange={date => changei(date)} 
                                minDate={new Date()}
                                /></td> */}
                            <button onClick={() => openModel(item.a_id)}>Update</button>
                        
                        
                        </tr>
                    ) : ''
                }
                </tbody>
            </Table>
    
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                Appointment Date:
                {
                    <Table>
                        <tbody>
                            <tr>
                                <td><DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} 
                                    minDate={new Date()}
                                    placeholderText="Select New Date"  /></td>
                            </tr>
                            <tr>
                                <td>              
                                    <Button renderAs="button" onClick={() => updateappoint()}>
                                        <span>Update</span>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </Modal>
        </div>
    )
}

export default Appointments