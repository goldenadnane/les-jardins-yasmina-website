import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://obxstthlkydxhtebyylv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ieHN0dGhsa3lkeGh0ZWJ5eWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3OTc1ODQsImV4cCI6MjA4MTM3MzU4NH0.VIAELjvuVqPdVMQoDyXoSozAZyQ87cnA-kA9oC02ywc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
