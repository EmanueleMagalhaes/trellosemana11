
import { Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import ListaInstrumentosCards from './Pages/InstumentosCards/ListaInstrumentosCards'
import ListaInstrumentosTabela from './Pages/InstrumentosTabela/ListaInstrumentosTabela'

function App() {
  
  return (
    
    <Routes>
      <Route path='/' Component={Home}> </Route>
      <Route path='/Cards' Component={ListaInstrumentosCards}></Route>
      <Route path='/Tabela' Component={ListaInstrumentosTabela}></Route>
    </Routes>
    
      
  
  );
}

export default App
