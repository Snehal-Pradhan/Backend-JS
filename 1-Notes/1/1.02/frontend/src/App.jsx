import { useState } from 'react'
import './App.css'

function App() {
  const[jokes,setJokes] = useState([])
  return (
    <> 
    <h1>Frontend intialized</h1>
    <p>
      JOKES: {jokes.length}
    </p>
    {
      jokes.map((joke,index)=>{
        <div key={joke.index}>
          <h3>{joke.title}</h3>
          <p>{joke.joke}</p>
        </div>
      })
    }
    </>
  )
}

export default App
