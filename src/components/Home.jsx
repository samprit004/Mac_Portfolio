import React from 'react'
import { locations } from '#/constants/index'
import clsx from 'clsx'
import useLocationStore from '#/store/location'
import useWindowStore from '#/store/Window'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'


const projects = locations.work ?.children ?? []
const resumeShortcut = {
    id: 'resume-shortcut',
    name: locations.resume.children?.[0]?.name ?? 'Resume.pdf',
    icon: locations.resume.children?.[0]?.icon ?? '/images/pdf.png',
    windowPosition: 'top-[12vh] right-8',
    type: 'resume',
}

const Home = () => {
    const {setActiveLocation} = useLocationStore()
    const {openWindow} = useWindowStore()

    const desktopItems = [...projects, resumeShortcut]

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project)
        openWindow('finder')
    }

    const handleDesktopItemClick = (item) => {
        const element = document.querySelector(`[data-desktop-item="${item.id}"]`)
        if (element?.dataset.dragging === 'true') return

        if (item.type === 'resume') {
            openWindow('resume')
            return
        }

        handleOpenProjectFinder(item)
    }

   useGSAP(()=>{
    Draggable.create('.folder', {
        minimumMovement: 8,
        onPress() {
            this.target.dataset.dragging = 'false'
        },
        onDrag() {
            this.target.dataset.dragging = 'true'
        },
        onRelease() {
            requestAnimationFrame(() => {
                this.target.dataset.dragging = 'false'
            })
        },
    })
   },[])

  return (
    <section id="home">
        <ul>
            {desktopItems.map((item) =>
            <li key={item.id}
            data-desktop-item={item.id}
            className={clsx('group folder', item.windowPosition)}
            onClick={()=> handleDesktopItemClick(item)} >
                <img src={item.icon ?? '/images/folder.png'} alt={item.name} />
                <p>{item.name}</p>
            </li>
            )}
        </ul>
    </section>
  )
}

export default Home