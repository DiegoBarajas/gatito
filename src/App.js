import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Game from './pages/Game'

const App = () => {
  return (
    <div>
        <Routes>

          <Route path='/' element={ <Index/> } />
          <Route path='/game' element={ <Game/> } />

        </Routes>
    </div>
  )
}

export default App