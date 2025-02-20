import { useState } from 'react'

import './App.css'
import BoxFittingChecker from './Components/BoxFittingChecker'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <BoxFittingChecker/>
  </>
  )
}

export default App
