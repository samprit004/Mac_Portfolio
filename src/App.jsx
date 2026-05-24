import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'

import { Terminal } from '#windows/index.js'
import { Navbar, Welcome, Dock } from '#components/index.js'

gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  )
}

export default App