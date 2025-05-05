import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'

const App = () => {

  // App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false)

  const huomio = () => {
    alert("Huomio!")
  }

  const [showPosts, setShowPosts] = useState(false)

  return (
      <div className="App">
        <h1>Hello from React!</h1>

        <CustomerList />

        {showPosts && <Posts />}

        {showPosts && <button onClick={() => setShowPosts(!showPosts)}>Piilota postaukset </button>}

        {!showPosts && <button onClick={() => setShowPosts(!showPosts)}>Näytä postaukset </button>}

        {showLaskuri && <Laskuri huomio={huomio} />}

        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri </button>}
        
        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri </button>}

        <Viesti teksti="tervehdys app komponentista" />

      </div>
  )
}

export default App
