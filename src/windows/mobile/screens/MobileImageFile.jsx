const MobileImageFile = ({ file }) => (
  <div className="mob-imagefile">
    <img
      src={file?.imageUrl ?? file?.icon}
      alt={file?.name ?? 'Image'}
      className="mob-imagefile-img"
    />
  </div>
)

export default MobileImageFile
