import React from 'react'
import Home from '../Home'
import Explain from '../Explain'
import GamePage from '../GamePage'
import Results from '../Results'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explain" element={<Explain />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/test" element={<Test />} />
        
      </Routes>
    </>  )
}

export default AppRouter