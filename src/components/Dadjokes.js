import { useState, useEffect } from 'react'
import axios from 'axios'

import './Dadjokes.css'

export default function Dadjoke() {
  const [ dadjokes, setDadjokes ] = useState([])
  const [ isError, setIsError ] = useState(false)

  async function fetchDadjoke() {
    if (isError) setIsError(false)

    try {
      const res = await axios.get('https://icanhazdadjoke.com', {
        headers: {accept: 'application/json'}
      })

      // If the joke already exists we try to fetch another one
      if (dadjokes.find(joke => joke.id == res.data.id))
        return fetchDadjoke()

      console.log(res)
      setDadjokes([res.data, ...dadjokes])
    
    } catch(err) {
      console.error(err)
      setIsError(true)
    }
  }

  useEffect(function() {
    fetchDadjoke()
  }, [])

  return (
    <main className="dadjokes">
      <h1 className="dadjokes-title">the most awesomest dadjokes™️</h1>
      <button className="btn" onClick={() => fetchDadjoke()}>Fetch another dadjoke</button>
      <button className="btn btn-error" onClick={() => setIsError(!isError)}>Debug: Toggle fail state</button>
      {dadjokes.length < 1 
        ? <p>Loading dadjokes...</p>
        : isError
          ? <p className="dadjokes-error">There was an issue fetching your dad jokes, maybe it's time to reevaluate what you spend your time reading.</p>
          : dadjokes.map(({ id, joke }) => <p className="dadjokes-joke" key={id}>{joke}</p>)
      }
    </main>
  )
}