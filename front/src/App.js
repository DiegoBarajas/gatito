import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import GameLocal from './pages/GameLocal'
import ChooseDifficulty from './pages/ChooseDifficulty'
import GameAlone from './pages/GameAlone'
import Stats from './pages/Stats'

const App = () => {
  return (
    <div>
        <div className='line'></div>
        <Routes>

          <Route path='/' element={ <Index /> } />
          <Route path='/stats' element={ <Stats /> } />

          <Route path='/local' element={ <GameLocal /> } />

          <Route path='/alone/choose' element={ <ChooseDifficulty /> } />
          <Route path='/alone/:difficulty' element={ <GameAlone /> } />



        </Routes>
    </div>
  )
}

export default App