import { useState, useEffect } from 'react'
import OutfitDisplay from './OutfitDisplay'

function Home() {
  const [outfits, setOutfits] = useState([])
  const [generatedOutfit, setGeneratedOutfit] = useState(null)
  const [filters, setFilters] = useState({
    occasion: 'casual',
    weather: 'mild'
  })

  useEffect(() => {
    const stored = localStorage.getItem('outfits')
    if (stored) {
      setOutfits(JSON.parse(stored))
    }
  }, [])

  const generateOutfit = () => {
    const tops = outfits.filter(item => 
      item.type === 'top' || item.type === 'dress'
    )
    const bottoms = outfits.filter(item => 
      item.type === 'bottom' || item.type === 'dress'
    )
    const outerwear = outfits.filter(item => 
      item.type === 'outerwear'
    )

    if (tops.length === 0 || (bottoms.length === 0 && !tops.some(t => t.type === 'dress'))) {
      alert('Please add more items to your closet first!')
      return
    }

    let outfit = {}

    const dressChance = Math.random() < 0.3
    if (dressChance && tops.some(t => t.type === 'dress')) {
      const dresses = tops.filter(t => t.type === 'dress')
      outfit.dress = dresses[Math.floor(Math.random() * dresses.length)]
    } else {
      const regularTops = tops.filter(t => t.type === 'top')
      if (regularTops.length > 0) {
        outfit.top = regularTops[Math.floor(Math.random() * regularTops.length)]
      }
      if (bottoms.length > 0) {
        outfit.bottom = bottoms[Math.floor(Math.random() * bottoms.length)]
      }
    }

    if (outerwear.length > 0 && Math.random() < 0.4) {
      outfit.outerwear = outerwear[Math.floor(Math.random() * outerwear.length)]
    }

    setGeneratedOutfit(outfit)
  }

  return (
    <div className="home">
      <h2>Generate Your Outfit</h2>
      
      <div className="filters">
        <label>
          Occasion:
          <select 
            value={filters.occasion} 
            onChange={(e) => setFilters({...filters, occasion: e.target.value})}
          >
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="business">Business</option>
            <option value="party">Party</option>
            <option value="athletic">Athletic</option>
          </select>
        </label>
        
        <label>
          Weather:
          <select 
            value={filters.weather} 
            onChange={(e) => setFilters({...filters, weather: e.target.value})}
          >
            <option value="hot">Hot</option>
            <option value="mild">Mild</option>
            <option value="cold">Cold</option>
            <option value="rainy">Rainy</option>
          </select>
        </label>
      </div>

      <button className="generate-btn" onClick={generateOutfit}>
        Generate New Outfit
      </button>

      {generatedOutfit && (
        <div className="generated-outfit">
          <h3>Your Outfit for Today:</h3>
          <OutfitDisplay outfit={generatedOutfit} />
        </div>
      )}
    </div>
  )
}

export default Home