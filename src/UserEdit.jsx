import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

    // Komponentin tilan määritys

const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
const [newUserName, setNewUserName] = useState(muokattavaUser.userName)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            userId: newUserId,
            firstName: newFirstName,
            lastName: newLastName,
            userName: newUserName,
            password: "xxxx"
        }

        UserService.update(newUser)
        .then(response => {
            if (response.status === 200) {
                setMessage("Edited User: " + newUser.userName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                setShowMessage(false)
                }, 3000)

                setMuokkaustila(false)
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
      <div id="edit">
           <h2>User Edit</h2>

           <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' value={newUserId} disabled/>
                </div>
                <div>
                <label>First name </label>
                <input type='text' value={newFirstName} onChange={({target}) => setNewFirstName(target.value)} required placeholder='First Name'/>
                </div>
                <div>
                <label>Last name </label>
                <input type='text' value={newLastName} onChange={({target}) => setNewLastName(target.value)} required placeholder='Last Name'/>
                </div>
                <div>
                <label>Username</label>
                <input type='text' value={newUserName} onChange={({target}) => setNewUserName(target.value)} required placeholder='Username'/>
                </div>

                <input type='submit' value='save' />
                <input type='button' value='back' onClick={() => setMuokkaustila(false)} />

           </form>

      </div>
  )
}

export default UserEdit
