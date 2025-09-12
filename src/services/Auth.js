import axios from 'axios'

const loginUrl = "https://localhost:7210/api/authentication"

const Login = (object) => {
    const request = axios.post(loginUrl, object)
    return request.then(response => response.data)
}

export default { Login }