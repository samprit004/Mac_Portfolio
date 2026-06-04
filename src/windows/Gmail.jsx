import { useState } from 'react'
import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'

const RECIPIENT_EMAIL = 'sampritdas2004@gmail.com'

const Gmail = () => {
  const [form, setForm] = useState({
    from: '',
    subject: '',
    body: '',
  })

  const handleFieldChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSend = () => {
    const mailtoUrl = new URL(`mailto:${RECIPIENT_EMAIL}`)

    if (form.subject) {
      mailtoUrl.searchParams.set('subject', form.subject)
    }

    if (form.body) {
      const bodyText = form.from
        ? `From: ${form.from}\n\n${form.body}`
        : form.body
      mailtoUrl.searchParams.set('body', bodyText)
    } else if (form.from) {
      mailtoUrl.searchParams.set('body', `From: ${form.from}`)
    }

    window.location.href = mailtoUrl.toString()
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col font-['SF_Pro_Text','SF_Pro_Display','-apple-system','BlinkMacSystemFont','Segoe_UI',sans-serif]"
      style={{ background: 'var(--window-content-bg)', color: 'var(--window-text)' }}
    >
      <div
        id="window-header"
        className="relative flex h-[38px] shrink-0 items-center justify-center border-b"
        style={{ borderColor: 'var(--window-divider)', background: 'var(--contact-header-bg)' }}
      >
        <div className="absolute left-[10px]">
          <WindowControls target="gmail" />
        </div>
        <span className="text-[13px] font-semibold tracking-[-0.1px]" style={{ color: 'var(--contact-title)' }}>
          Gmail
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-y" style={{ borderColor: 'var(--window-divider)' }}>
          <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center px-6 py-2.5">
            <span className="text-[13px] font-normal" style={{ color: 'var(--window-muted)' }}>To:</span>
            <input
              type="email"
              value={RECIPIENT_EMAIL}
              readOnly
              className="w-full border-none bg-transparent text-[14px] font-medium outline-none"
              style={{ color: 'var(--window-text)' }}
            />
          </div>
          <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center border-t px-6 py-2.5" style={{ borderColor: 'var(--window-divider)' }}>
            <span className="text-[13px] font-normal" style={{ color: 'var(--window-muted)' }}>From:</span>
            <input
              type="email"
              value={form.from}
              onChange={(event) => handleFieldChange('from', event.target.value)}
              placeholder="your@email.com"
              className="w-full border-none bg-transparent text-[14px] font-normal outline-none"
              style={{ color: 'var(--window-text)' }}
            />
          </div>
          <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center border-t px-6 py-2.5" style={{ borderColor: 'var(--window-divider)' }}>
            <span className="text-[13px] font-normal" style={{ color: 'var(--window-muted)' }}>Subject:</span>
            <input
              type="text"
              value={form.subject}
              onChange={(event) => handleFieldChange('subject', event.target.value)}
              placeholder="Let’s work together"
              className="w-full border-none bg-transparent text-[14px] font-normal outline-none"
              style={{ color: 'var(--window-text)' }}
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <textarea
            value={form.body}
            onChange={(event) => handleFieldChange('body', event.target.value)}
            placeholder="Write your message here..."
            className="min-h-full w-full resize-none border-none bg-transparent px-0 py-0 text-[14px] font-normal outline-none"
            style={{ color: 'var(--window-text)' }}
          />
        </div>

        <div className="flex shrink-0 justify-end border-t px-6 py-3" style={{ borderColor: 'var(--window-divider)', background: 'var(--window-content-bg)' }}>
          <button
            type="button"
            onClick={handleSend}
            className="rounded-md bg-[#007aff] px-4 py-1.5 text-[13px] font-semibold text-white shadow-sm transition hover:brightness-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

const GmailWindow = WindowWrapper(Gmail, 'gmail')

export default GmailWindow
