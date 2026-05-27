import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import useWindowStore from '#/store/Window'

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
        <div className="w-15" />
      </div>
      <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
        {image && (
          <img src={image} alt={name} className="w-full rounded-lg object-cover max-h-48" />
        )}
        {subtitle && (
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{subtitle}</p>
        )}
        {description?.map((para, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed">{para}</p>
        ))}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtfile');
export default TextWindow;
