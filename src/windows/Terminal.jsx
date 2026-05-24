import React from 'react'
import { Check, Flag } from 'lucide-react'
import WindowWrapper from '#/hoc/WindowWrapper'
import { techStack } from '#/constants'
import { WindowControls } from '#/components'

const Terminal = () => {
  return (
    <>
    <div id='window-header'>
    <WindowControls target="terminal" />
      <h2>TechStack</h2>
    </div>

    <div className='techstack'>
      <p>
        <span className='font-bold'>@samprit %</span>
        Show tech stack
      </p>

      <div className='label'>
        <p className='w-32'>category</p>
        <p>Technologies</p>
      </div>

      <ul className='content'>
        {techStack.map(({category, items}) =>(
          <li key={category} className='flex items-center'>
            <Check className='check' size={16} color='#00A154'/>
            <h3 className='w-32'>{category}</h3>
            <ul>
              {items.map((item, i) => (
                <li key={i}>{item} {i < items.length - 1 && <span className='text-gray-400'>,</span>}</li>
              ))}
            </ul>

          </li>
        ))}
      </ul>
      <div className='footnote'>
        <p><Check className='check' size={16} color='#00A154'/> All technologies are up to date as of May 14, 2026.</p>
        <p className='text-black'>
          <Flag className='flag' size={16} fill='#000000'/>
          render time: 6ms
        </p>
      </div>
    </div>
    
    </>
  )
}
const TerminalWindow = WindowWrapper(Terminal, 'terminal')
export default TerminalWindow