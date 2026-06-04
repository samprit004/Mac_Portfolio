import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { navLinks, navIcons } from '#constants/index.js'
import useThemeStore from '#store/theme.js'
import useWindowStore from '#store/Window.js'

const Navbar = () => {

  const {openWindow} = useWindowStore();
  const { theme, toggleTheme } = useThemeStore();
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <nav className="max-sm:hidden">
    <div>
      <img src="/images/logo.svg" alt="logo" className="nav-icon" />
      <p className=' font-bold'>Samprit Das</p>
      {/* <ul>
        {navLinks.map((item) => (
          <li key={item.id} onClick={() => openWindow(item.type)}>
            <p>{item.name}</p>
          </li>
        ))}
      </ul> */}
    </div>

    <div>
      <ul>
        {navIcons.map((item) => (
        <li
          key={item.id}
          onClick={item.img.includes('mode') ? toggleTheme : undefined}
          className={item.img.includes('mode') ? 'cursor-pointer' : undefined}
          title={item.img.includes('mode') ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : undefined}
        >
          <img
            src={item.img}
            className={`nav-icon icon-hover ${item.img.includes('mode') && theme === 'dark' ? 'opacity-80' : ''}`}
            alt={item.img.includes('mode') ? 'toggle theme' : item.id}
          />
        </li>
      ))}
      </ul>

      <time>{now.format('h:mm A')}</time>
      <time>{now.format('ddd, MMM DD')}</time>
    </div>
    </nav>
  )
}

export default Navbar