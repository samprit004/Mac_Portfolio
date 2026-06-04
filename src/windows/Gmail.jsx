import { useState } from 'react'
import WindowControls from '#/components/WindowControls'
import WindowWrapper from '#/hoc/WindowWrapper'
import { RECIPIENT_EMAIL, isValidEmail, saveContactMessage } from '#/services/contact/saveContactMessage.js'

const Gmail = () => {
  const [form, setForm] = useState({
    from: '',
    subject: '',
    body: '',
  })
  const [sendState, setSendState] = useState({
    status: 'idle',
    message: '',
  })
  const trimmedFrom = form.from.trim()
  const trimmedSubject = form.subject.trim()
  const isFromValid = isValidEmail(trimmedFrom)
  const canSend = isFromValid && trimmedSubject.length > 0

  const handleFieldChange = (field, value) => {
    if (sendState.status !== 'idle') {
      setSendState({ status: 'idle', message: '' })
    }
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSend = async () => {
    if (!canSend || sendState.status === 'sending') return

    try {
      setSendState({ status: 'sending', message: 'Saving message...' })
      await saveContactMessage({
        from: form.from,
        subject: form.subject,
        body: form.body,
        sentFrom: 'desktop',
      })
      setForm({
        from: '',
        subject: '',
        body: '',
      })
      setSendState({ status: 'success', message: 'Message saved successfully.' })
    } catch (error) {
      setSendState({
        status: 'error',
        message: error?.message ? `Save failed: ${error.message}` : 'Failed to save message.',
      })
    }
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
            <span className="text-[13px] font-normal" style={{ color: 'var(--window-muted)' }}>
              From: <span style={{ color: '#ff3b30' }}>*</span>
            </span>
            <input
              type="email"
              value={form.from}
              onChange={(event) => handleFieldChange('from', event.target.value)}
              placeholder="your@email.com"
              aria-invalid={trimmedFrom.length > 0 && !isFromValid}
              className="w-full border-none bg-transparent text-[14px] font-normal outline-none"
              style={{ color: 'var(--window-text)' }}
            />
          </div>
          <div className="grid grid-cols-[78px_minmax(0,1fr)] items-center border-t px-6 py-2.5" style={{ borderColor: 'var(--window-divider)' }}>
            <span className="text-[13px] font-normal" style={{ color: 'var(--window-muted)' }}>
              Subject: <span style={{ color: '#ff3b30' }}>*</span>
            </span>
            <input
              type="text"
              value={form.subject}
              onChange={(event) => handleFieldChange('subject', event.target.value)}
              placeholder="Let’s work together"
              aria-invalid={trimmedSubject.length === 0}
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
          <div className="mr-auto flex items-center">
            {sendState.message ? (
              <p
                className="text-[12px] font-medium"
                style={{
                  color:
                    sendState.status === 'error'
                      ? '#ff3b30'
                      : sendState.status === 'success'
                        ? '#16a34a'
                        : 'var(--window-muted)',
                }}
                aria-live="polite"
              >
                {sendState.message}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend || sendState.status === 'sending'}
            className="rounded-md px-4 py-1.5 text-[13px] font-semibold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: canSend ? '#007aff' : 'color-mix(in srgb, #007aff 42%, #94a3b8 58%)' }}
          >
            {sendState.status === 'sending' ? 'Saving...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

const GmailWindow = WindowWrapper(Gmail, 'gmail')

export default GmailWindow
