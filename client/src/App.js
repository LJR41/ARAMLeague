import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegisterUser from './Components/RegisterUser';
import RegisterMatch from './Components/RegisterMatch';
import AddPlayers from './Components/AddPlayers';
import ViewPlayer from './Components/ViewPlayer';
import NavBar from './Components/Navbar';
import History from './Pages/MatchHistory';
import Rules from './Components/Rules';
import HomePage from './Pages/Home';
import AdminNavbar from './Components/AdminNavbar';
import AddQuadra from './Components/AddQuadra';

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      {<NavBar/>}
      <Routes>
        {/* <Route path='/' element={<LoginPage/>}/> */}
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterUser/>}/>
        <Route path='/new/match' element={<RegisterMatch/>}/>
        <Route path='/match/players' element={<AddPlayers/>}/>
        <Route path='/view/player/:id' element={<ViewPlayer/>}/>
        <Route path='/view/match' element={<History/>}/>
        <Route path='/rules' element={<Rules/>}/>
        <Route path='/quadra' element={<AddQuadra/>}/>
        
      </Routes> 
    </div>
  );
}

export default App;
