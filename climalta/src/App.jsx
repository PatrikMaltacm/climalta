import { useState } from 'react'
import './App.css'
import ApiJs from './api'


function App() {
  const [count, setCount] = useState(0)

  return (
    <ApiJs/>
  )
}

export default App
