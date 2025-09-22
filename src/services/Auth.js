import axios from 'axios'

const loginUrl = "https://northwindrestapijulkaistu-d6gffbe5bcc3drdu.swedencentral-01.azurewebsites.net"

const Login = (object) => {
    const request = axios.post(loginUrl, object)
    return request.then(response => response.data)
}

export default { Login }
