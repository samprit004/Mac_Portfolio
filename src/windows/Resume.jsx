import React, { useState } from 'react'
import { Download } from 'lucide-react'
import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import { pdfjs, Document, Page  } from 'react-pdf'
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const RESUME_FILE = "/files/Samprit_detailed_cv.pdf"

const Resume = () => {
  const [numPages, setNumPages] = useState(null)

  return (
    <>

    <div id='window-header'>
        <WindowControls target="resume" />
        <h2>My Resume</h2>
        <a href={RESUME_FILE} download className='cursor-pointer'>
        <Download className='icon'/>
        </a>
    </div>
    <div className='resume-body'>
      <Document
        file={RESUME_FILE}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages
          ? Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="resume-page">
                <Page
                  pageNumber={i + 1}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </div>
            ))
          : (
              <div className="resume-page">
                <Page
                  pageNumber={1}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </div>
            )}
      </Document>
    </div>
    </>
  )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')

export default ResumeWindow