# QCM Armée de Terre

Application Next.js + Supabase.

## Fonctions
- Site public QCM
- Mode examen 20/50/100 questions
- Correction immédiate
- Interface admin protégée par mot de passe
- Ajout / modification / suppression
- Import CSV en masse

## Variables Vercel
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD

## Format CSV attendu
question,reponse_a,reponse_b,reponse_c,reponse_d,bonne_reponse,explication,difficulte,actif
