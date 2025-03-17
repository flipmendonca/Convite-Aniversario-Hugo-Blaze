import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oxtxmytcphwvtlzctjxm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94dHhteXRjcGh3dnRsemN0anhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNzEwNjQsImV4cCI6MjA1Nzc0NzA2NH0.UFMAwDJh2Infa9YvI51G_0YO_f7reBU0ZW7E_4--MwU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para as tabelas
export type RsvpRow = {
  id?: number;
  created_at?: string;
  name: string;
  phone: string;
  number_of_guests: number;
  message?: string;
};

export type MessageRow = {
  id?: number;
  created_at?: string;
  author: string;
  message: string;
  image_url?: string | null;
}; 