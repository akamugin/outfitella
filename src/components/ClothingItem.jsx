import React from 'react'

function ClothingItem({ item, onDelete }) {
  return (
    <div className="clothing-item">
      {item.image ? (
        <div className="item-image">
          <img src={item.image} alt={item.name} />
        </div>
      ) : (
        <div className="item-placeholder">
          <div className="placeholder-icon">👔</div>
        </div>
      )}
      
      <div className="item-info">
        <h4>{item.name}</h4>
        <p className="item-color">Color: {item.color}</p>
        <p className="item-type">{item.type}</p>
        {item.canLayer && <span className="layer-badge">Can Layer</span>}
        {item.description && (
          <p className="item-description">{item.description}</p>
        )}
      </div>
      
      <button 
        className="delete-btn" 
        onClick={() => onDelete(item.id)}
        aria-label="Delete item"
      >
        ×
      </button>
    </div>
  )
}

export default ClothingItem