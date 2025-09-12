import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'

// Propsi otettu vastaan suoraan nimellä
const Login = ({setIsPositive, setMessage, setShowMessage, setLoggedIn}) => {

    // Komponentin tilan määritys
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
        event.preventDefault()
        var user = {
            username: newUsername,
            password: md5(newPassword) // Salataan md5 kirjaston metodilla
        }

        LoginService.Login(user)
        .then(response => {
        
             // Näytetään message
            setMessage("Tervetuloa " + response.userName)
            setIsPositive(true)
            setShowMessage(true)

            // Messagen piilotus
            setTimeout(() => setShowMessage(false),
            4000)


            localStorage.setItem("username", response.userName)
            localStorage.setItem("accesslevel", response.accesslevelId)
            localStorage.setItem("token", response.token)

            //Muutetaan APP komponentin loggedIn state trueksi
            setLoggedIn(true)

        })
        .catch(error => {
            //Näytetään message virhetilanteessakin
            setMessage(error.message)
            setIsPositive(false)
            setShowMessage(true)

            // Messagen piilotus
            setTimeout(() => setShowMessage(false),
        4000)
        }
    )
}

 return (
    <div id="addNew">

       <h3>Login</h3>

       <form onSubmit={handleSubmit}>
     
            <div>
                <input type="text" value={newUsername} placeholder="User name"
                    onChange={({ target }) => setNewUsername(target.value)} required />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} required />
            </div>
            
         <input type='submit' value='save' />
         {" "}
         <input type='button' value='back' />

       </form>

    </div>
  )
}

export default Login