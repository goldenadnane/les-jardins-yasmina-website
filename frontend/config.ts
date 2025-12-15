// Supabase configuration
// Fill in your Supabase project URL and anon key in the Settings menu
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  }
};
