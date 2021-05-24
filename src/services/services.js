import axios from "axios";


const baseUrl = "http://localhost:8000/api"

const register = (data) => {

    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);

    const requestOptions = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    
    return axios.post(`${baseUrl}/register`, formData, requestOptions)
                .then(response => handleResponse(response))
                .then(data => data)
                .catch(err => console.log(err))
}

const login = (data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const requestOptions = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    return axios.post(`${baseUrl}/login`, formData, requestOptions)
        .then(response => handleResponse(response))
        .then(data => data)
        .catch(err => console.log(err))
}

const logout = () => {
    localStorage.removeItem('user-info');
}

const getAppointments = (userid) => {
    let formData = new FormData();
    formData.append('userid', userid);

    return axios.post(baseUrl + '/getappoint', formData)
        .then(response => handleResponse(response))
        .then(data => data)
        .catch(err => console.log(err))
}

const updateAppointment = (data) => {
    let formData = new FormData();
    formData.append('aid', data.aid);
    formData.append('sdate', data.sdate);

    return axios.post(baseUrl + '/updateappoint', formData)
        .then(response => handleResponse(response))
        .then(data => data)
        .catch(err => console.log(err))
}

const getUsersList = () => {
    return axios.get(baseUrl + '/list',)
                .then(response => handleResponse(response))
                .then(data => data)
                .catch(err => console.log(err))
}

const connectUser = (data) => {
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    };

    let formData = new FormData()
    formData.append("user_a", data.user_a)
    formData.append("user_b", data.user_b)
    
    return axios.post(baseUrl + '/userconnect', formData,requestOptions )
                .then(response => handleResponse(response))
                .then(data => data)
                .catch(err => console.log(err))
}

const getConnectionsList = (data) => {
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    };

    let formData = new FormData()
    formData.append("user_a", data.user_a)
    
    return axios.post(baseUrl + '/getconnections', formData,requestOptions )
                .then(response => handleResponse(response))
                .then(data => data)
                .catch(err => console.log(err))
}

const makeAppointment = (data) => {
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    };

    let formData = new FormData()
    formData.append("cid", data.cid)
    formData.append("sdate", data.sdate)
    
    return axios.post(baseUrl + '/makeappointment', formData, requestOptions )
                .then(response => handleResponse(response))
                .then(data => data)
                .catch(err => console.log(err))
}

const handleResponse = (response) => {

    if (response.status !== 200 && response.status !== 201 ) {
        if (response.status === 401) {
            logout();
        }
        const error = (response.data && response.data.message) || response.statusText;
        return Promise.reject(error);
    }

    if (response.statusText !== "OK") {
        const error = response.data.errors[0];
        return Promise.reject(error);
    }

    return response.data;
}

// From Here we will export all the API functions to be usable anywhere in the app
export const services = {
    login,
    register,
    getAppointments,
    updateAppointment,
    getUsersList,
    connectUser,
    getConnectionsList,
    makeAppointment
}
