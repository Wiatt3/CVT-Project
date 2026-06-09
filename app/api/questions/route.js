import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
export async function GET(){try{const supabase=supabaseAdmin();const {data,error}=await supabase.from('questions').select('*').eq('actif',true).order('id',{ascending:true});if(error)throw error;return NextResponse.json({questions:data||[]});}catch(error){return NextResponse.json({error:error.message},{status:500});}}
