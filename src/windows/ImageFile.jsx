import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import useWindowStore from '#/store/Window'

const ImageFile = () => {
  const { windows } = useWindowStore()
  const data = windows.imgfile.data

  if (!data) return null

  const { name, imageUrl } = data

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
        <div className="w-15" />
      </div>
      <div className="preview">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="max-h-[70vh] w-full rounded-lg object-contain"
          />
        )}
      </div>
    </>
  )
}

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile')

export default ImageFileWindow
