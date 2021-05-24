import React,{useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import {Button, ButtonToolBar} from 'react-bootstrap'
import PopUp from '../../components/PopUp/PopUp'
import Select from 'react-select';
import Modal from '../../components/Modal/Modal'
import {Link} from 'react-router-dom'
import {SingleDatePicker} from 'react-dates'
import DatePicker from 'react-datepicker'
import {useHistory} from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { getConnectionsListFromAPI, makeAppointment } from '../../redux/connectedList/connectList.actions'

function ConnectionList()
{
    const dispatch = useDispatch()
    const history = useHistory()
    const authData = useSelector(state => state.authState.data)
    const data = useSelector(state => state.connectionsList.data)

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
      setIsOpen(!isOpen);
    }


    const[selectedDate, setSelectedDate] = useState(null)
    const[selectedID, setselectedId] = useState(null)

    
  function openModel(cid){
	setIsOpen(true);
	
    setselectedId(cid);
    // console.log(selectedID);
  }
function changei(da){
    
   setSelectedDate(da);
    console.log(da);
}
const appointment = () =>{
    let sdate= selectedDate;
    let cid= selectedID;

    let apiData={cid,sdate}

    dispatch(makeAppointment(apiData))

    alert("Appointment Added")
    history.push('/appointments')
    
    setIsOpen(false);
 }

useEffect(() =>{
    const user_a= authData.id;
    let apiData={user_a}

    dispatch(getConnectionsListFromAPI(apiData))
},[])

	return (
        <div>
        <h1>Your Connections</h1>
<Table>

<tr>
    <td>Id</td>
    <td>Name</td>
    <td>Email</td>

    

</tr>
{

    data ? data.map((item)=>
        <tr>
            <td>{item.cid}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        {/* <td><button  id={item.id} renderAs="button">Make Appointment</button></td> */}
        {/* <td><DatePicker selected={selectedDate} onChange={date => changei(date)} 
				minDate={new Date()}
				/></td> */}
                <button onClick={() => openModel(item.cid)}>Appoint</button>
        
        
    </tr>
    ) : ''
}
</Table>
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
		Appointment Date:
		
		
		{

		<Table>
				<tr>
                <td><DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} 
				minDate={new Date()}
                placeholderText="Select Date"  /></td>
			</tr>
            <tr>
          <td>              
           
                <Button renderAs="button" onClick={() => appointment()}>
                        <span>Appointment</span>
                </Button>
         
            </td>
            </tr>
            </Table>
			
		}
		
		</Modal>
</div>
    )
}
		


export default ConnectionList