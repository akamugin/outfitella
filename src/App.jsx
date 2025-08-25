import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Closet from './components/Closet'
import AddItem from './components/AddItem'
import './App.css'

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="app-title">Outfitella</h1>
        <div className="nav-links">
          <Link to="/">Generate Outfit</Link>
          <Link to="/closet">My Closet</Link>
          <Link to="/add">Add Item</Link>
        </div>
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </main>
    </div>
  )
}

export default App