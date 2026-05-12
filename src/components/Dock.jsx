import { useState, useRef } from 'react'
import { dockApps } from '#constants/index.js'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Dock = () => {
  const [hoveredAppId, setHoveredAppId] = useState(null)
  const dockRef = useRef(null)

  useGSAP(() => {
    const dock = dockRef.current
    if(!dock) return;

    const icons = dock.querySelectorAll('.dock-icon');

    const animateIcons = (mouseX) => {
        const {left} = dock.getBoundingClientRect();

        icons.forEach((icon) => {
            const {left: iconLeft, width} = icon.getBoundingClientRect();
            const center = iconLeft - left + width / 2;
            const distance = Math.abs(mouseX - center);
            const intensity = Math.exp(-(distance ** 2.5) / 10000);

            gsap.to(icon, {
                scale: 1 + 0.25 * intensity,
                y: -15 * intensity,
                duration: 0.2,
                ease: "power1.Out",
            })
        })
    }

    const handleMouseMove = (e) => {
        const {left} = dock.getBoundingClientRect();
        animateIcons(e.clientX - left);
    }

    const resetIcons = () => {
        icons.forEach((icon) => {
            gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
            })
        })
    }

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', resetIcons);

    return () => {
        dock.removeEventListener('mousemove', handleMouseMove);
        dock.removeEventListener('mouseleave', resetIcons);
    }
  }, []);


  const toggleApp = (app) => {
    // will do it later
  }

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id ?? name} className="relative flex justify-center">
            <div
              id={`dock-app-${id}`}
              className="flex justify-center"
              onMouseEnter={() => setHoveredAppId(id)}
              onMouseLeave={() => {
                setHoveredAppId((currentId) => (currentId === id ? null : currentId))
              }}
              onFocus={() => setHoveredAppId(id)}
              onBlur={() => {
                setHoveredAppId((currentId) => (currentId === id ? null : currentId))
              }}
            >
              <button
                id={`dock-icon-${id}`}
                type="button"
                className="dock-icon"
                aria-label={name}
                disabled={!canOpen}
                onClick={() => handleAppClick(id)}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? '' : 'opacity-60'}
                />
              </button>
            </div>
            <Tooltip
              anchorSelect={`#dock-icon-${id}`}
              content={name}
              place="top"
              className="tooltip pointer-events-none"
              positionStrategy="fixed"
              noArrow
              imperativeModeOnly
              isOpen={hoveredAppId === id}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dock