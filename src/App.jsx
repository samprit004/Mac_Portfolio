import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'

import { Terminal, Safari, Resume, Finder, Text } from '#windows/index.js'
import { Navbar, Welcome, Dock } from '#components/index.js'

gsap.registerPlugin(Draggable)

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      {/* Windows */}
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
    </main>
  )
}

export default App