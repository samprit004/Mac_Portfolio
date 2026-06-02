import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import useWindowStore from '#/store/Window'
import { getTimelineContent } from './timelineContent'

const TimelineFile = () => {
  const { windows } = useWindowStore()
  const file = windows.timelinefile.data

  if (!file?.timelineType) return null

  const content = getTimelineContent(file.timelineType)

  if (!content) return null

  return (
    <>
      <div id="window-header">
        <WindowControls target="timelinefile" />
        <h2>{content.title}</h2>
        <div className="w-15" />
      </div>

      <div
        className="timeline-window-body overflow-y-auto p-6"
        style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-5">
          <section className="pb-1">
            <div className="space-y-1.5">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: 'var(--window-muted)' }}
              >
                {content.eyebrow}
              </p>
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="text-[28px] font-semibold tracking-[-0.04em]">
                    {content.title}
                  </h3>
                  <p
                    className="max-w-2xl text-[14px] leading-6"
                    style={{ color: 'var(--window-muted)' }}
                  >
                    {content.summary}
                  </p>
                </div>

                <p
                  className="shrink-0 pt-0.5 text-[12px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: 'var(--window-muted)' }}
                >
                  {content.items.length} entries
                </p>
              </div>
            </div>
          </section>

          <section className="relative pl-9 pt-1">
            <div
              className="pointer-events-none absolute bottom-2 left-2.5 top-2 w-px rounded-full"
              style={{
                background: 'var(--window-divider)',
              }}
            />

            <div className="space-y-4">
              {content.items.map((item, index) => (
                <article
                  key={item.id}
                  className="relative pb-7"
                  style={{
                    borderBottom:
                      index === content.items.length - 1
                        ? 'none'
                        : '1px solid var(--window-divider)',
                  }}
                >
                  <div
                    className="absolute left-[-2.05rem] top-0.5 flex size-4 items-center justify-center rounded-full"
                    style={{ background: 'var(--window-content-bg)' }}
                  >
                    <span
                      className="block size-2 rounded-full"
                      style={{ background: 'var(--window-text)' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex min-h-4 flex-wrap items-center justify-between gap-x-6 gap-y-2">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className="inline-flex shrink-0 text-[12px] font-semibold leading-none tabular-nums"
                          style={{ color: 'var(--window-muted)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p
                          className="text-[11px] font-semibold leading-none uppercase tracking-[0.18em]"
                          style={{ color: 'var(--window-muted)' }}
                        >
                          {item.meta}
                        </p>
                      </div>

                      <p
                        className="shrink-0 self-center whitespace-nowrap text-[13px] font-medium leading-none"
                        style={{ color: 'var(--window-muted)' }}
                      >
                        {item.period}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-[20px] font-semibold tracking-[-0.03em]">
                        {item.title}
                      </h4>
                      <p className="text-[14px] font-medium" style={{ color: 'var(--window-muted)' }}>
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 max-w-3xl text-[14px] leading-6" style={{ color: 'var(--window-text)' }}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

const TimelineFileWindow = WindowWrapper(TimelineFile, 'timelinefile')

export default TimelineFileWindow
