import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { useEffect } from 'react'

import { Terminal, Safari, Resume, Finder, Text, ImageFile, Contact } from './windows/index.js'
import { Navbar, Welcome, Dock, Home } from './components/index.js'
import useThemeStore from '#store/theme.js'

gsap.registerPlugin(Draggable)

const App = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <main data-theme={theme}>
      <Navbar />
      <Welcome />
      <Dock />

      {/* Windows */}
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <ImageFile />
      <Contact />

      <Home />
    </main>
  )
}

export default App