import React from 'react'
import dayjs from 'dayjs'

import { navLinks, navIcons } from '#constants/index.js'
import useWindowStore from '#store/Window.js'

const Navbar = () => {

  const {openWindow} = useWindowStore();

  return (
    <nav>
    <div>
      <img src="/images/logo.svg" alt="logo" />
      <p className=' font-bold'>Samprit Das</p>
      <ul>
        {navLinks.map((item) => (
          <li key={item.id} onClick={() => openWindow(item.type)}>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <ul>
        {navIcons.map((item) => (
        <li key={item.id}>
          <img src={item.img}  className="icon-hover" alt={item.id}/>
        </li>
      ))}
      </ul>

      <time>{dayjs().format('h:MM A')}</time>
      <time>{dayjs().format('ddd, MMM DD')}</time>
    </div>
    </nav>
  )
}

export default Navbar