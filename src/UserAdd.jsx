import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import md5 from 'md5'

// Propsi otettu vastaan suoraan nimellä
const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

    // Komponentin tilan määritys

const [newFirstName, setNewFirstName] = useState('')
const [newLastName, setNewLastName] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUserName, setNewUserName] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [passwordError, setPasswordError] = useState('')

useEffect(() => {
    if (confirmPassword && newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match")
    } else {
        setPasswordError("")
    }
}, [newPassword, confirmPassword])


// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
        event.preventDefault()

         if (newPassword !== confirmPassword) {
        setPasswordError("Passwords do not match")
        return
    }
        var newUser = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            accesslevelId: parseInt(newAccesslevelId),
            userName: newUserName,
            password: md5(newPassword) // Salataan md5 kirjaston metodilla
        }

        const token = localStorage.getItem('token')
                    UserService
                        .setToken(token)

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
                <input type='text' value={newFirstName} onChange={({target}) => setNewFirstName(target.value)} required placeholder='First name' />
                </div>
                <div>
                <input type='text' value={newLastName} onChange={({target}) => setNewLastName(target.value)} required placeholder='Last name'/>
                </div>
                <div>
                <input type='email' value={newEmail} onChange={({target}) => setNewEmail(target.value)} placeholder='Email'/>
                </div>
                <div>
                <input type='number' value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} placeholder='Access level'/>
                </div>
                <div>
                <input type='text' value={newUserName} onChange={({target}) => setNewUserName(target.value)} placeholder='Username'/>
                </div>
                <div>
                <input type='password' value={newPassword} onChange={({target}) => setNewPassword(target.value)} placeholder='Password'/>
                </div>
                <div>
                <input type='password' value={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} placeholder='Confirm Password' required />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>

                <input type='submit' value='save' />
                <input type='button' value='back' onClick={() => setLisäystila(false)} />

           </form>

      </div>
  )
}

export default UserAdd