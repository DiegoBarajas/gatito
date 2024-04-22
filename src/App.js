import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Game from './pages/Game'
import GameLocal from './pages/GameLocal'
import ChooseDifficulty from './pages/ChooseDifficulty'
import GameAlone from './pages/GameAlone'

const App = () => {
  return (
    <div>
        <div className='line'></div>
        <Routes>

          <Route path='/' element={ <Index /> } />
          <Route path='/game' element={ <Game /> } />

          <Route path='/local' element={ <GameLocal /> } />

          <Route path='/alone/choose' element={ <ChooseDifficulty /> } />
          <Route path='/alone/:difficulty' element={ <GameAlone /> } />



        </Routes>
    </div>
  )
}

export default App