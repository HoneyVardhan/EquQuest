// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hsgewggoqzgholpefctp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZ2V3Z2dvcXpnaG9scGVmY3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMjIxODUsImV4cCI6MjA2MzU5ODE4NX0.CAOuYeOZoto7wlNwfgfQGWyMkohz6bjJF_VnjUmgi5w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);