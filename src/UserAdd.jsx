import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'
import md5 from 'md5'

// Propsi otettu vastaan suoraan nimellä
const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys

const [newFirstname, setNewFirstname] = useState('')
const [newLastname, setNewLastname] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            firstName: newFirstname,
            lastName: newLastname,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            userName: newUsername,
            password: md5(newPassword) // Salataan md5 kirjaston metodilla
        }

        console.log(newUser)

        UserService.create(newUser)
        .then(response => {
            if (response.status === 200) {
                setMessage(`Added new User: ${newUser.firstName} ${newUser.lastName}`)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                setShowMessage(false)
                }, 3000)

                setLisäystila(false)
            }
        })
        .catch(error => {
            setMessage(error)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
                }, 3000)

        })
}

  return (
      <div id="addNew">
           <h2>User add</h2>

           <form onSubmit={handleSubmit}>
            <div>
                <input type='text' value={newFirstname} onChange={({target}) => setNewFirstname(target.value)} required placeholder='First name' />
                </div>
                <div>
                <input type='text' value={newLastname} onChange={({target}) => setNewLastname(target.value)} required placeholder='Last name'/>
                </div>
                <div>
                <input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder='Email'/>
                </div>
                <div>
                <input type='number' value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} placeholder='Access level'/>
                </div>
                <div>
                <input type='text' value={newUsername} onChange={({target}) => setNewUsername(target.value)} placeholder='Username'/>
                </div>
                <div>
                <input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder='Password'/>
                </div>

                <input type='submit' value='save' />
                <input type='button' value='back' onClick={() => setLisäystila(false)} />

           </form>

      </div>
  )
}

export default UserAdd