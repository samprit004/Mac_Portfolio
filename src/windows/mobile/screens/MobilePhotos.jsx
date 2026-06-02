import { useMemo } from 'react'
import useMobileWindowStore from '#store/mobileWindow.js'
import { buildTimelineGroups } from '#/windows/photos/timelineData.js'

const MobilePhotos = () => {
  const { push } = useMobileWindowStore()
  const timelineGroups = useMemo(() => buildTimelineGroups(), [])

  const handleOpenImage = (item) => {
    push({
      id: `mobile-photo-${item.id}`,
      title: item.name,
      component: 'imagefile',
      props: {
        file: {
          name: item.name,
          imageUrl: item.imageUrl,
        },
      },
    })
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-y-auto overflow-x-hidden px-4 pb-8 pt-4 sm:px-5 sm:pb-9 sm:pt-4 font-['SF_Pro_Text','SF_Pro_Display','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]"
      style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}
    >
      <div className="space-y-7">
        {timelineGroups.map((group, index) => {
          const previousGroup = timelineGroups[index - 1]
          const showYear = !previousGroup || previousGroup.year !== group.year

          return (
            <div key={group.id}>
              {showYear ? (
                <div
                  className="mb-3 text-[26px] font-bold leading-none tracking-[-0.5px]"
                  style={{ color: 'var(--contact-title)' }}
                >
                  {group.year}
                </div>
              ) : null}

              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[14px] font-semibold tracking-[-0.08px]" style={{ color: 'var(--window-text)' }}>
                    {group.date}
                  </p>
                  <p className="mt-1 text-[12px]" style={{ color: 'var(--window-muted)' }}>
                    {group.label}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--window-muted)' }}>
                  {group.items.length} items
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {group.items.map((item) => (
                  <div key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleOpenImage(item)}
                      className="group relative aspect-square w-full overflow-hidden rounded-[16px] border shadow-sm"
                      style={{
                        borderColor: 'var(--window-divider)',
                        background: 'var(--window-subtle-bg)',
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-active:scale-[0.98]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 via-black/10 to-transparent px-2.5 py-2">
                        <p className="truncate text-[10px] font-medium text-white">{item.source}</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MobilePhotos
