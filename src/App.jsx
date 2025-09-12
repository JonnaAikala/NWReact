import {useState, useEffect} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Posts from './Posts'
import CustomerList from './CustomerList'
import ProductList from './ProductList'
import UserList from './UserList'
import Message from './Message'
import Login from './Login'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {

// App komponentin tila
//Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)
const [loggedIn, setLoggedIn] = useState(false)

useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      setLoggedIn(true)
    }
  },[])

// Logout metodi
const logout = () => {
  localStorage.clear()
  setLoggedIn(false)
}

const headerStyle = {color: "blue", backgroundColor: "red"}

  return (
    <div className="App">

        <Router>

          <Navbar bg="dark" variant="dark">
           <Nav className="mr-auto">
             <Nav.Link href='/customers'>Customers</Nav.Link>
             <Nav.Link href='/products'>Products</Nav.Link>
             <Nav.Link href='/posts'>Some highlights</Nav.Link>
             <Nav.Link href='/users'>Users</Nav.Link>
              <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
             {loggedIn && <button onClick={() => logout()}>Log out</button>}
            </Nav>
        </Navbar>

         <h1 style={headerStyle}>Northwind Corporation</h1>

         {showMessage && <Message message={message} isPositive={isPositive} /> }

         {!loggedIn && <Login setMessage={setMessage} setIsPositive={setIsPositive} 
          setShowMessage={setShowMessage} setLoggedIn={setLoggedIn} />}
          
      {loggedIn &&
          <Routes>
           <Route path="/customers"
             element={<CustomerList setMessage={setMessage} setIsPositive={setIsPositive}
             setShowMessage={setShowMessage} />}>
            </Route>

            <Route path="/products"
             element={<ProductList setMessage={setMessage} setIsPositive={setIsPositive}
             setShowMessage={setShowMessage} />}>
            </Route>

           <Route path="/users"
             element={<UserList setMessage={setMessage} setIsPositive={setIsPositive}
              setShowMessage={setShowMessage} />}>
           </Route>

            <Route path="/posts"
            element={<Posts info="Nämä ovat yhtiön sosiaalisen median parhaita poimintoja."
            tervehdys="Hello!"/>}>
          </Route>

          <Route path="/laskuri"
            element={<Laskuri />}>
          </Route>

        </Routes> }
      </Router>

    </div>
  )
}


export default App
