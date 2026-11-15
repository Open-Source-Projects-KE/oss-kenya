import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// null when keys are missing, so the app falls back to sample data
export const supabase = url && key ? createClient(url, key) : null
