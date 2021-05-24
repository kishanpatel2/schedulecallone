import React, {useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/Authentication/auth.actions'

const Register = () => {    
    const dispatch = useDispatch()
    // 1 State instead of multiple if the data are interlinked
	const [formData, setFormData]= useState({
        name : '',
        password : '',
        email : ''
    })
    
    const handleInputChange = (event) => {
        event.preventDefault()

        setFormData({
            ...formData,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmitClick = (event) => {
        if(formData.name && formData.email && formData.password){
            dispatch(registerUser(formData))
        }else{
            alert("Please fill in all fields!")
        }
    }

	return (
		<>
		    <div className="col-sm-6 offset-sm-3">
                <h1>Register Page</h1>
                <input type="name" name="name" value={formData.name} onChange={(e)=>handleInputChange(e)} className="form-control" placeholder="name" />
                <br />
                <input type="password" name="password" value={formData.password} onChange={(e)=>handleInputChange(e)} className="form-control" placeholder="password" />
                <br />
                <input type="email" name="email" value={formData.email} onChange={(e)=>handleInputChange(e)} className="form-control" placeholder="email" />
                <br />
                <button onClick={(e) => handleSubmitClick(e)} className="btn btn-primary">Sign Up</button>
			</div>
        </>
    )
}

export default Register