import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { useEffect } from 'react'

import { Terminal, Safari, Resume, Finder, Text, ImageFile, Contact, Gmail, Photos, TimelineFile } from './windows/index.js'
import MobileWindowWrapper from './hoc/MobileWindowWrapper.jsx'
import { Navbar, Welcome, Dock, Home, MobileHomeScreen, MobileStatusBar, IntroOverlay } from './components/index.js'
import useDeviceMode from '#/hooks/useDeviceMode.js'
import useThemeStore from '#store/theme.js'

gsap.registerPlugin(Draggable)

const App = () => {
  const theme = useThemeStore((state) => state.theme)
  const { isDesktop } = useDeviceMode()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <main data-theme={theme}>
      <IntroOverlay />
      {isDesktop ? (
        <>
          <Navbar />
          <Welcome />
          <Dock />
          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <ImageFile />
          <Contact />
          <Gmail />
          <Photos />
          <TimelineFile />
          <Home />
        </>
      ) : (
        <>
          <MobileStatusBar />
          <MobileHomeScreen />
          <MobileWindowWrapper />
        </>
      )}
    </main>
  )
}

export default App