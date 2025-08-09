import useGetInstruments from "../../hooks/useGetInstruments";
import "./ListaInstrumentosCard.css";
import CardInstrumento from "../../Components/CardInstrumento";
import { Link } from "react-router-dom";

function ListaInstrumentosCards() {
  // Obtém dados, status de carregamento e erro do hook customizado
  const { dados: equipamentos, carregando, erro } = useGetInstruments();

  // Exibe estado de carregamento
  if (carregando) {
    return <p>Carregando...</p>;
  }

  // Exibe mensagem de erro
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
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {equipamentos.map((item) => (
            <CardInstrumento
              key={item.id}
              nome={item.nome}
              tipo={item.tipo}
              marca={item.marca}
              ano={item.ano}
              preco={item.preco}
              status={item.ativo ? "Ativo" : "Inativo"} // conversão de boolean para texto
              voltagem={item.voltagem}
              peso={item.peso_kg}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaInstrumentosCards;
