import { useEffect, useMemo, useState } from 'react'

const TABLET_MIN_WIDTH = 640
const DESKTOP_MIN_WIDTH = 1024

const getViewportWidth = () => {
  if (typeof window === 'undefined') return DESKTOP_MIN_WIDTH
  return window.innerWidth
}

const useDeviceMode = () => {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useMemo(() => {
    const isDesktop = viewportWidth >= DESKTOP_MIN_WIDTH
    const isTablet = viewportWidth >= TABLET_MIN_WIDTH && viewportWidth < DESKTOP_MIN_WIDTH
    const isMobile = viewportWidth < TABLET_MIN_WIDTH

    return {
      viewportWidth,
      isDesktop,
      isTouch: !isDesktop,
      isTablet,
      isMobile,
    }
  }, [viewportWidth])
}

export default useDeviceMode
