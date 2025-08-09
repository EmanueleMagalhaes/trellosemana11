import { useEffect, useState } from "react";


function useGetInstruments() {
  const [dados, setDados] = useState([]); // Lista de instrumentos
  const [carregando, setCarregando] = useState(true); // Status de carregamento
  const [erro, setErro] = useState(null); // Mensagem de erro

  useEffect(() => {
    let ativo = true; // Evita atualizar estado se o componente já foi desmontado
    const controller = new AbortController(); // Permite cancelar requisição

    async function fetchDados() {
      try {
        const res = await fetch("http://localhost:3000/equipamentos", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`);
        }

        const json = await res.json();

        if (ativo) {
          setDados(json);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setErro("Erro ao carregar instrumentos.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    fetchDados();

    return () => {
      ativo = false;
      controller.abort(); // Cancela requisição se desmontar
    };
  }, []);

  return { dados, carregando, erro };
}

export default useGetInstruments;