import supabase from '../supabaseClient';
import type { TablesInsert } from "../../database.types";

export const adicionarUsuario = async (usuario: TablesInsert<'usuarios'>) => {

  // 1️⃣ Verifica se o email já existe
  const { data: existingUser, error: selectError } = await supabase
    .from('usuarios')
    .select('email')
    .eq('email', usuario.email)
    .single(); // retorna um único registro

  if (selectError) throw selectError;

  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  if (usuario.password.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres');
  }
  // 2️⃣ Se não existir, adiciona o usuário
  const { data, error } = await supabase
    .from('usuarios')
    .insert([usuario]);
  if (error) throw error;
    
  return data;
}