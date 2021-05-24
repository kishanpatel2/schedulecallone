import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/Authentication/auth.actions'

const Login = () => {
	const [formData, setFormData] = useState({
        email : '',
        password : ''
    })
    
    // This is the Hook that allows us to call/dispatch actions instead of using connect
    const dispatch= useDispatch()

    // No need to redirect to /add if user is logged in becasue,
    // now we have handled it inside our App.js Component through PrivateRoute

	// useEffect(()=>{
	// 	if(localStorage.getItem('user-info'))
	// 	{
	// 		history.push("/add")
	// 	}
    // },[])
    

    // Adding this handler which will update the state data according to the input changed
    const handleInputChange = (event) => {
        event.preventDefault()

        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    // Changing name from "login" to "handleSubmitClick" and from normal function to arrow function
	const handleSubmitClick = () => {
        if(formData.email && formData.password){
            dispatch(loginUser(formData))

        }else{
            alert("Please enter both email and password!")
        }
        
    }
	return (
		<div>
			<h1>Login Page</h1>
			<div className="col-sm-6 offset-sm-3">
                <input type="text" placeholder="email" name="email" value={formData.email} onChange={(e)=> handleInputChange(e)} className="form-control"/>
                <br /> 
                <input type="password" placeholder="password" name="password" value={formData.password} onChange={(e)=> handleInputChange(e)} className="form-control"/>
                <br /> 
                <button onClick={(e) => handleSubmitClick(e)} className="btn btn-primary">Login</button>
			</div>
        </div>
		)
}

export default Login