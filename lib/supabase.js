import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // ⬅ Importa el polyfill aquí también

const SUPABASE_URL = 'https://movwvzlwhxsokkqifete.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdnd2emx3aHhzb2trcWlmZXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NDkwMDAsImV4cCI6MjA2NDIyNTAwMH0.x6x763T8479-BCMLh8IGoIqBIKCwF5siJqh8lQL3PBY'; 

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    realtime: {
      enabled: false,  // ⬅ Desactiva por completo la parte de realtime (ya no usará `ws`)
    },
  }
);