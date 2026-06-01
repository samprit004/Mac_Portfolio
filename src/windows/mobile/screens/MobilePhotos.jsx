import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useMobileWindowStore from '#store/mobileWindow.js'
import { buildTimelineGroups } from '#/windows/photos/timelineData.js'

gsap.registerPlugin(ScrollTrigger)

const MobilePhotos = () => {
  const { push } = useMobileWindowStore()
  const scrollRef = useRef(null)
  const timelineGroups = useMemo(() => buildTimelineGroups(), [])

  useGSAP(() => {
    const scroller = scrollRef.current
    if (!scroller) return

    const groups = gsap.utils.toArray('[data-mobile-photo-group]', scroller)

    groups.forEach((group) => {
      const yearBlock = group.querySelector('[data-mobile-photo-year]')
      const copyBlock = group.querySelector('[data-mobile-photo-copy]')
      const tiles = group.querySelectorAll('[data-mobile-photo-tile]')

      if (yearBlock) {
        gsap.fromTo(
          yearBlock,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              scroller,
              start: 'top 86%',
              once: true,
            },
          }
        )
      }

      if (copyBlock) {
        gsap.fromTo(
          copyBlock,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              scroller,
              start: 'top 86%',
              once: true,
            },
          }
        )
      }

      gsap.fromTo(
        tiles,
        { autoAlpha: 0, y: 20, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: group,
            scroller,
            start: 'top 84%',
            once: true,
          },
        }
      )
    })
  }, [timelineGroups])

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
      ref={scrollRef}
      className="flex h-full min-h-0 flex-col overflow-y-auto overflow-x-hidden px-4 pb-8 pt-4 font-['SF_Pro_Text','SF_Pro_Display','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]"
      style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}
    >
      <div className="space-y-7">
        {timelineGroups.map((group, index) => {
          const previousGroup = timelineGroups[index - 1]
          const showYear = !previousGroup || previousGroup.year !== group.year

          return (
            <div key={group.id} data-mobile-photo-group>
              {showYear ? (
                <div
                  data-mobile-photo-year
                  className="mb-3 text-[26px] font-bold leading-none tracking-[-0.5px] opacity-0"
                  style={{ color: 'var(--contact-title)' }}
                >
                  {group.year}
                </div>
              ) : null}

              <div data-mobile-photo-copy className="mb-3 flex items-center justify-between gap-3 opacity-0">
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

              <div className="grid grid-cols-3 gap-2.5">
                {group.items.map((item) => (
                  <div key={item.id} data-mobile-photo-tile className="opacity-0">
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
