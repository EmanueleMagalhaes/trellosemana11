import useGetInstruments from "../../hooks/useGetInstruments";
import { Link } from "react-router-dom";
import "./ListaInstrumentosTabela.css";

function ListaInstrumentosTabela() {
  // Obtém dados, status de carregamento e erro do hook customizado
  const { dados: equipamentos, carregando, erro } = useGetInstruments();

  // Estado de carregamento
  if (carregando) {
    return <p>Carregando...</p>;
  }

  // Estado de erro
  if (erro) {
    return <p>{erro}</p>;
  }

  return (
    <div className="lista-container">
      <div className="controls">
        <Link to="/cards" className="btn">Listagem (Cards)</Link>
        <Link to="/tabela" className="btn">Listagem (Tabela)</Link>
      </div>

      <h1 className="titulo">Lista de Instrumentos</h1>

      {equipamentos.length === 0 ? (
        <p>Nenhum equipamento encontrado.</p>
      ) : (
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
            {equipamentos.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.tipo}</td>
                <td>{item.marca}</td>
                <td>{item.voltagem}</td>
                <td>{item.ano}</td>
                <td>{Number(item.preco).toFixed(2)}</td>
                <td>{item.peso_kg}</td>
                <td>{item.ativo ? "Ativo" : "Inativo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaInstrumentosTabela;
