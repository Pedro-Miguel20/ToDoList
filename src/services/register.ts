import supabase from '../supabaseClient';
import type { TablesInsert } from "../../database.types";
import bcrypt from 'bcryptjs';

export const adicionarUsuario = async (usuario: TablesInsert<'usuarios'>) => {

  // 1️⃣ Verifica se o email já existe
  const { data: existingUser, error: selectError } = await supabase
    .from('usuarios')
    .select('email')
    .eq('email', usuario.email)
    .maybeSingle();

  if (selectError) throw selectError;

  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  if (usuario.password.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres');
  }

  // 2️⃣ Gera o hash da senha
  const hashedPassword = await bcrypt.hash(usuario.password, 10); // 10 rounds

  // 3️⃣ Insere o usuário no banco com senha criptografada
  const { data, error } = await supabase
    .from('usuarios')
    .insert([
      {
        ...usuario,
        password: hashedPassword, // salva o hash
      }
    ]);

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
}
