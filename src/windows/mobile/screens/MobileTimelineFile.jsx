import { getTimelineContent } from '../../timelineContent'

const MobileTimelineFile = ({ file }) => {
  const content = getTimelineContent(file?.timelineType)

  if (!content) return null

  return (
    <div className="mob-timelinefile px-5 pb-8 pt-5">
      <section className="pb-1">
        <div className="space-y-2">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'var(--window-muted)' }}
          >
            {content.eyebrow}
          </p>
          <h3 className="text-[26px] font-semibold tracking-tighter" style={{ color: 'var(--window-text)' }}>
            {content.title}
          </h3>
          <p
            className="text-[12px] font-medium uppercase tracking-[0.18em]"
            style={{ color: 'var(--window-muted)' }}
          >
            {content.items.length} entries
          </p>
          <p className="max-w-sm text-[14px] leading-6" style={{ color: 'var(--window-muted)' }}>
            {content.summary}
          </p>
        </div>
      </section>

      <section className="relative pl-8 pt-1">
        <div
          className="pointer-events-none absolute bottom-2 left-2 top-2 w-px rounded-full"
          style={{
            background: 'var(--window-divider)',
          }}
        />

        <div className="space-y-4">
          {content.items.map((item, index) => (
            <article
              key={item.id}
              className="relative pb-6"
              style={{
                borderBottom:
                  index === content.items.length - 1
                    ? 'none'
                    : '1px solid var(--window-divider)',
              }}
            >
              <div
                className="absolute left-[-1.8rem] top-0.5 flex size-4 items-center justify-center rounded-full"
                style={{ background: 'var(--window-content-bg)' }}
              >
                <span
                  className="block size-2 rounded-full"
                  style={{ background: 'var(--window-text)' }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex min-h-4 flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="inline-flex shrink-0 text-[12px] font-semibold leading-none tabular-nums"
                      style={{
                        color: 'var(--window-muted)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="truncate text-[11px] font-semibold leading-none uppercase tracking-[0.18em]" style={{ color: 'var(--window-muted)' }}>
                      {item.meta}
                    </p>
                  </div>

                  <span
                    className="shrink-0 self-center whitespace-nowrap text-[12px] font-medium leading-none"
                    style={{ color: 'var(--window-muted)' }}
                  >
                    {item.period}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[18px] font-semibold leading-6 tracking-[-0.03em]" style={{ color: 'var(--window-text)' }}>
                    {item.title}
                  </h4>
                  <p className="text-[13px] font-medium leading-5" style={{ color: 'var(--window-muted)' }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-[14px] leading-6" style={{ color: 'var(--window-text)' }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MobileTimelineFile
