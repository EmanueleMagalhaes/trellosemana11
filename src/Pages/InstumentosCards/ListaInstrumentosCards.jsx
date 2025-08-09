import useGetInstruments from "../../hooks/useGetInstruments";
import "./ListaInstrumentosCard.css";
import CardInstrumento from "../../Components/CardInstrumento";

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
  );
}

export default ListaInstrumentosCards;
