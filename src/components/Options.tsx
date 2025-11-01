import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { message } from "antd";
import { IconLogout2 } from '@tabler/icons-react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { loginUser } from "../services/login";




export default function Options() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      // 1️⃣ Encerra a sessão no Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 2️⃣ Remove qualquer dado local
      localStorage.removeItem("usuario");

      // 3️⃣ Mostra feedback visual
      message.success("Você saiu da conta com sucesso!");
      
      // 4️⃣ Redireciona para o login sem recarregar a página
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      message.error("Erro ao encerrar sessão. Tente novamente.");
    }
  }
  
const items: MenuProps['items'] = [
  {
    label: (
      <button><p>profile</p></button>
    ),
    key: '0',
  },
  {
    label: (
      <button>dark</button>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: (<button onClick={handleLogout} className="flex py-2 text-blue-700 gap-2 opacity-80 hover:opacity-100"><IconLogout2/><p>logout</p></button>),
    key: '3',
  },
];

  const loginUser = localStorage.getItem("usuario");
  const userObject = loginUser ? JSON.parse(loginUser) : null;


  return (
    <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      <Space className="select-none cursor-pointer opacity-80 hover:opacity-100">
        {userObject.name}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
    
  );
}