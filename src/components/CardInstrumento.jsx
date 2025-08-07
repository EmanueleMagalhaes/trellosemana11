import "./CardInstrumento.css"

function CardInstrumento({nome, tipo, marca, ano, preco, status, voltagem, peso}) {

    return (
        <div className="card">
        <h2>{nome}</h2>
        <p><strong>Tipo:</strong> {tipo}</p>
        <p><strong>Marca:</strong> {marca}</p>
        <p><strong>Ano:</strong> {ano}</p>
        <p><strong>Preco:</strong> {preco}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Voltagem:</strong> {voltagem}</p>
        <p><strong>Peso:</strong> {peso}</p>
        </div>
    );
}

export default CardInstrumento;