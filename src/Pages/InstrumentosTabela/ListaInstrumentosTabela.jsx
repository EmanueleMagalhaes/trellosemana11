import React from 'react';
import './ListaInstrumentosTabela.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ListaInstrumentosTabela () {
    const [equipamentos, setEquipamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // useEffect → executa a função assim que o componente for montado
    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();

        //Função para buscar os dados da API
        const fetchEquipamentos = async () => {
            try {
                const response = await fetch("http://localhost:3000/equipamentos", { signal: controller.signal });
                if (!response.ok) throw new Error("Erro ao carregar equipamentos");
                const dados = await response.json();
                if (mounted) setEquipamentos(dados);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.error(err);
                    setErro("Erro ao carregar equipamentos");
                    
                }
            } finally {
                if (mounted) {
                    setCarregando(false);
                }
            }
        };

        fetchEquipamentos();
        return () => {
            mounted = false;
            controller.abort(); // Cancela a requisição se o componente for desmontado
        };
    }, []);
    if (carregando) return <p className="mensagem erro">{erro}</p>;

    return (
    <div className="lista-container">
      {/* Botões para alternar entre as páginas */}
      <div className="controls">
        <Link to="/cards" className="btn">listagem (cards)</Link>
        <Link to="/tabela" className="btn">Listagem (tabela)</Link>
      </div>

      {/* Título centralizado */}
      <h1 className="titulo">Lista de Instrumentos</h1>

      {/* Se não houver nenhum equipamento, mostra mensagem */}
      {equipamentos.length === 0 ? (
        <p className="mensagem">Nenhum equipamento cadastrado.</p>
      ) : (
        // Caso contrário, exibe a tabela
        <div className="table-wrapper">
          <table className="equipamentos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Voltagem</th>
                <th>Ano</th>
                <th>Preço (R$)</th>
                <th>Peso (kg)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Itera sobre o array de equipamentos e cria uma linha para cada item */}
              {equipamentos.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td>{item.voltagem ?? ""}</td> {/* Se não existir, mostra vazio */}
                  <td>{item.ano ?? ""}</td>
                  <td>{item.preco !== undefined ? Number(item.preco).toFixed(2) : ""}</td>
                  <td>{item.peso_kg ?? ""}</td>
                  <td>{String(item.ativo)}</td> {/* Converte boolean para texto */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
}

export default ListaInstrumentosTabela;