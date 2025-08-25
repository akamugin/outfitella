import { useState, useEffect } from 'react'
import ClothingItem from './ClothingItem'

function Closet() {
  const [outfits, setOutfits] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const stored = localStorage.getItem('outfits')
    if (stored) {
      setOutfits(JSON.parse(stored))
    }
  }, [])

  const deleteItem = (id) => {
    const updated = outfits.filter(item => item.id !== id)
    setOutfits(updated)
    localStorage.setItem('outfits', JSON.stringify(updated))
  }

  const filteredOutfits = filter === 'all' 
    ? outfits 
    : outfits.filter(item => item.type === filter)

  const groupedItems = {
    top: filteredOutfits.filter(item => item.type === 'top'),
    bottom: filteredOutfits.filter(item => item.type === 'bottom'),
    dress: filteredOutfits.filter(item => item.type === 'dress'),
    outerwear: filteredOutfits.filter(item => item.type === 'outerwear')
  }

  return (
    <div className="closet">
      <h2>My Closet</h2>
      
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'top' ? 'active' : ''} 
          onClick={() => setFilter('top')}
        >
          Tops
        </button>
        <button 
          className={filter === 'bottom' ? 'active' : ''} 
          onClick={() => setFilter('bottom')}
        >
          Bottoms
        </button>
        <button 
          className={filter === 'dress' ? 'active' : ''} 
          onClick={() => setFilter('dress')}
        >
          Dresses
        </button>
        <button 
          className={filter === 'outerwear' ? 'active' : ''} 
          onClick={() => setFilter('outerwear')}
        >
          Outerwear
        </button>
      </div>

      <div className="closet-content">
        {filter === 'all' ? (
          <>
            {Object.entries(groupedItems).map(([type, items]) => (
              items.length > 0 && (
                <div key={type} className="category-section">
                  <h3>{type.charAt(0).toUpperCase() + type.slice(1)}s</h3>
                  <div className="items-grid">
                    {items.map(item => (
                      <ClothingItem 
                        key={item.id} 
                        item={item} 
                        onDelete={deleteItem}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </>
        ) : (
          <div className="items-grid">
            {filteredOutfits.map(item => (
              <ClothingItem 
                key={item.id} 
                item={item} 
                onDelete={deleteItem}
              />
            ))}
          </div>
        )}

        {filteredOutfits.length === 0 && (
          <p className="empty-message">
            No items in this category. Start adding items to your closet!
          </p>
        )}
      </div>
    </div>
  )
}

export default Closet