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
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export default MobileTextFile
