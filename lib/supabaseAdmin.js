import { createClient } from '@supabase/supabase-js';
export function supabaseAdmin(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw new Error('Variables Supabase manquantes côté serveur.');return createClient(url,key);}
export function checkAdminPassword(request){const expected=process.env.ADMIN_PASSWORD;const provided=request.headers.get('x-admin-password');return Boolean(expected&&provided&&provided===expected);}
