import React from 'react'
import { Download } from 'lucide-react'
import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import { pdfjs, Document, Page  } from 'react-pdf'
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const Resume = () => {
  return (
    <>

    <div id='window-header'>
        <WindowControls target="resume" />
        <h2>My Resume</h2>
        <a href="/files/2026_job.pdf" download className='cursor-pointer'>
        <Download className='icon'/>
        </a>
    </div>
    <Document file="/files/2026_job.pdf">
        <Page pageNumber={1} 
        renderTextLayer
        renderAnnotationLayer />
    </Document>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow