import { useEffect, useState } from "react";
import "./ListaInstrumentosCard.css"
import CardInstrumento from "../../Components/CardInstrumento";

function ListaInstrumentosCards() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/equipamentos")
            .then((res) => res.json())
            .then((dados) => {
                setEquipamentos(dados);
                setCarregando(false);
            })
            .catch((err) => {
                console.log(err);
                setErro("Erro ao carregar equipamentos");
                setCarregando(false);
            });

    }, []);

    if (carregando) return <p>Carregando...</p>;
    if (erro) return <p>{erro}</p>;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {equipamentos.map((item) => (
            <CardInstrumento key={item.id} {...item} />
          ))}
        </div>
    );
}

export default ListaInstrumentosCards;