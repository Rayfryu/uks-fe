import React from 'react'
import Navbar from './components/Navbar'
import { Hero } from './pages/Hero'
import Second from './pages/Second'
import Third from './pages/Third'
import Four from './pages/Four'
import Five from './pages/Five'
import Six from './pages/Six'

function App() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <Navbar />
      <section className="snap-start min-h-screen">
        <Hero />
      </section>
      <section className="snap-start min-h-screen">
        <Second />
        <Five />
        <Six />
        <Third />
        <Four />
      </section>
    </div>
  )
}

export default App
