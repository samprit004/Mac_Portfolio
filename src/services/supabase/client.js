import { createClient } from '@supabase/supabase-js'

const FALLBACK_SUPABASE_URL = 'https://bfpxinhwfzavfniqmhwb.supabase.co'
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_A3T2wb6mgvF61zaEJ9-Sfw_QVOThRaC'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  FALLBACK_SUPABASE_PUBLISHABLE_KEY

const hasSupabaseConfig = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)

let supabaseClient = null

const getSupabaseClient = () => {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase configuration is missing.')
  }

  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  }

  return supabaseClient
}

export { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, hasSupabaseConfig, getSupabaseClient }
export default getSupabaseClient
