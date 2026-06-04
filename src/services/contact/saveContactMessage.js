import { getSupabaseClient } from '#/services/supabase/client.js'

const CONTACT_MESSAGES_TABLE = import.meta.env.VITE_SUPABASE_CONTACT_TABLE || 'contact_messages'
const RECIPIENT_EMAIL = 'sampritdas2004@gmail.com'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const saveContactMessage = async ({ from, subject, body, sentFrom }) => {
  const trimmedFrom = from.trim()
  const trimmedSubject = subject.trim()
  const trimmedBody = body.trim()
  const now = new Date()

  const payload = {
    from_email: trimmedFrom,
    to_email: RECIPIENT_EMAIL,
    subject: trimmedSubject,
    message: trimmedBody || null,
    sent_from: sentFrom,
    submitted_at: now.toISOString(),
    submitted_at_local: now.toLocaleString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
    locale: navigator.language ?? null,
    user_agent: navigator.userAgent ?? null,
    page_url: window.location.href,
    status: 'new',
  }

  const supabase = getSupabaseClient()
  const { error } = await supabase.from(CONTACT_MESSAGES_TABLE).insert(payload)

  if (error) {
    throw error
  }

  return payload
}

export { CONTACT_MESSAGES_TABLE, RECIPIENT_EMAIL, isValidEmail, saveContactMessage }
