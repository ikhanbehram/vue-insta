import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://onqqpyosjvdlzemvqqel.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ucXFweW9zanZkbHplbXZxcWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxODM2NDQsImV4cCI6MTk4ODc1OTY0NH0.1pdJyNi2RQkXwb9yMcQk8ayPS-1iwj4xNvSBH1bEgrM"
export const supabase = createClient(supabaseUrl, supabaseKey) 