import { useState } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const PAGE_WIDTH = Math.min(window.innerWidth, 640)

const ResumeSkeleton = () => (
  <div className="mob-resume-skeleton">
    <div className="mob-skel mob-skel-title" />
    <div className="mob-skel mob-skel-subtitle" />
    <div className="mob-skel mob-skel-divider" />
    {[100, 90, 95, 70, 100, 85, 60].map((w, i) => (
      <div key={i} className="mob-skel mob-skel-line" style={{ width: `${w}%` }} />
    ))}
    <div className="mob-skel mob-skel-divider" />
    {[100, 88, 94, 75, 100, 82].map((w, i) => (
      <div key={i} className="mob-skel mob-skel-line" style={{ width: `${w}%` }} />
    ))}
    <div className="mob-skel mob-skel-divider" />
    {[100, 92, 78, 100, 65].map((w, i) => (
      <div key={i} className="mob-skel mob-skel-line" style={{ width: `${w}%` }} />
    ))}
  </div>
)

const MobileResume = () => {
  const [numPages, setNumPages] = useState(null)

  return (
    <div className="mob-resume-pdf">
      <Document
        file="/files/2026_job.pdf"
        loading={<ResumeSkeleton />}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages
          ? Array.from({ length: numPages }, (_, i) => (
              <div key={i} className="mob-resume-page">
                <Page
                  pageNumber={i + 1}
                  width={PAGE_WIDTH}
                  renderTextLayer
                  renderAnnotationLayer
                  loading={<ResumeSkeleton />}
                />
              </div>
            ))
          : <ResumeSkeleton />
        }
      </Document>
    </div>
  )
}

export default MobileResume
