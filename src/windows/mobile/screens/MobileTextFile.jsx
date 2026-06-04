import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: true })

const MobileTextFile = ({ file }) => {
  const lines = file?.description ?? []

  return (
    <div className="mob-textfile">
      {file?.subtitle && (
        <p className="mob-textfile-subtitle">{file.subtitle}</p>
      )}
      {file?.image && (
        <img src={file.image} alt={file.name} className="mob-textfile-img" />
      )}
      <div className="mob-textfile-body">
        {lines.map((line, i) => (
          line?.trim()
            ? (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: marked.parseInline(line) }}
                />
              )
            : <div key={i} className="h-1" />
        ))}
      </div>
    </div>
  )
}

export default MobileTextFile
