import React from 'react'
import useWindowStore from '#store/Window.js'

const WindowControls = ({target}) => {
    const {closeWindow} = useWindowStore();

    
  return (
    <div id='window-controls'>
        <div 
        className='close'
        onClick={() => closeWindow(target)}
        />
        <div className='minimize'
        // onClick={() => minimizeWindow(target)}
        />
        <div className='maximize cursor-pointer'
        // onClick={() => maximizeWindow(target)}
        />
    </div>

  )
}

export default WindowControls