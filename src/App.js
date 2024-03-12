import logo from './logo.svg';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RegisterUser from './Components/RegisterUser';
import RegisterMatch from './Components/RegisterMatch';
import AddPlayers from './Components/AddPlayers';
import ViewPlayer from './Components/ViewPlayer';
import NavBar from './Components/Navbar';
import Leaderboard from './Components/Leaderboard';
import MatchHistory from './Components/MatchHistory';
import Register from './Components/Register';
import Rules from './Components/Rules';

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      {<NavBar></NavBar>}
      <Routes>
        <Route path='/' element={<Leaderboard/>}/> 
        <Route path='/register/new' element={<Register/>}/>
        <Route path='/register' element={<RegisterUser/>}/>
        <Route path='/new/match' element={<RegisterMatch/>}/>
        <Route path='/match/players' element={<AddPlayers/>}/>
        <Route path='/view/player/:id' element={<ViewPlayer/>}/>
        <Route path='/view/match' element={<MatchHistory/>}/>
        <Route path='/rules' element={<Rules/>}/>
      </Routes> 
    </div>
  );
}

export default App;
