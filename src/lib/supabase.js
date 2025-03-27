// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Remplace par tes vraies infos (copie/colle depuis ton tableau de bord Supabase)
const supabaseUrl = 'https://ouaijdlvmavthiieripu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91YWlqZGx2bWF2dGhpaWVyaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDI4MzksImV4cCI6MjA1ODYxODgzOX0.csAdCvIhdj43OvE1M5APQx96XgsJvKwX8-eCcgvzc7I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
