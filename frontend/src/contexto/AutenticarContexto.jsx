import { createContext, useState, useEffect, useContext } from "react";

const AutenticacaoContexto = createContext();

export const ProvedorAutenticacao = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const dados = JSON.parse(atob(token.split(".")[1]));
        const agora = Date.now() / 1000;

        if (dados.exp > agora) {
          setUsuario({
            id: dados.id,
            email: dados.email,
            tipo: dados.tipo,
            token: token,
          });
        }
      } catch {
        setUsuario(null);
      }
    }
    setCarregando(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const dados = JSON.parse(atob(token.split(".")[1]));
    setUsuario({
      id: dados.id,
      email: dados.email,
      tipo: dados.tipo,
      token: token,
    });
  };

  const logout = (pularConfirmar = false) => {
    const isDeletar =
      typeof pularConfirmar === "boolean" ? pularConfirmar : false;

    if (!isDeletar) {
      const confirmar = window.confirm(
        "Tem certeza que deseja encerrar a sessão?"
      );
      if (!confirmar) return;
    }

    localStorage.removeItem("token");
    setUsuario(null);
  };

  const contexto = { usuario, login, logout, carregando };

  return (
    <AutenticacaoContexto.Provider value={contexto}>
      {children}
    </AutenticacaoContexto.Provider>
  );
};

export const useAutenticacao = () => useContext(AutenticacaoContexto);
