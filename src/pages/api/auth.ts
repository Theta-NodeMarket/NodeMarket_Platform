import { supabase } from '../../lib/initSupabase'

export default function handler(req: any) {
  supabase.auth.getSession()
}