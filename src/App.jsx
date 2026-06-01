import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { useEffect } from 'react'

import { Terminal, Safari, Resume, Finder, Text, ImageFile, Contact, Gmail, Photos } from './windows/index.js'
import MobileWindowWrapper from './hoc/MobileWindowWrapper.jsx'
import { Navbar, Welcome, Dock, Home, MobileHomeScreen, MobileStatusBar, IntroOverlay } from './components/index.js'
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
      <IntroOverlay />
      <Navbar />
      <Welcome />
      <Dock />

      {/* Windows — tablet / desktop only */}
      <div className="max-sm:hidden">
        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <ImageFile />
        <Contact />
        <Gmail />
        <Photos />
      </div>

      <Home />
      <MobileStatusBar />
      <MobileHomeScreen />
      <MobileWindowWrapper />
    </main>
  )
}

export default App