import axios from 'axios'

const loginUrl = "https://northwindrestapijonnaaikala-eycfd4c8c6hggugu.swedencentral-01.azurewebsites.net"

const Login = (object) => {
    const request = axios.post(loginUrl, object)
    return request.then(response => response.data)
}

export default { Login }