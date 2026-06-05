import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'
import { useEffect } from 'react'

import { Terminal, Safari, Resume, Finder, Text, ImageFile, Contact, Gmail, Photos, TimelineFile } from './windows/index.js'
import MobileWindowWrapper from './hoc/MobileWindowWrapper.jsx'
import { Navbar, Welcome, Dock, Home, MobileHomeScreen, MobileStatusBar, IntroOverlay } from './components/index.js'
import useDeviceMode from '#/hooks/useDeviceMode.js'
import useMobileWindowStore from '#store/mobileWindow.js'
import useThemeStore from '#store/theme.js'

gsap.registerPlugin(Draggable)

const App = () => {
  const theme = useThemeStore((state) => state.theme)
  const { isDesktop } = useDeviceMode()
  const restoreFromHistory = useMobileWindowStore((state) => state.restoreFromHistory)
  const isMobileHistoryState = useMobileWindowStore((state) => state.isMobileHistoryState)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.body.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined' || isDesktop) return undefined

    const handlePopState = (event) => {
      restoreFromHistory(event.state)
    }

    if (isMobileHistoryState(window.history.state)) {
      restoreFromHistory(window.history.state)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isDesktop, isMobileHistoryState, restoreFromHistory])

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