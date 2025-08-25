import React from 'react'

function OutfitDisplay({ outfit }) {
  return (
    <div className="outfit-display">
      {outfit.outerwear && (
        <div className="outfit-item outerwear">
          <h4>Outerwear</h4>
          {outfit.outerwear.image ? (
            <img src={outfit.outerwear.image} alt={outfit.outerwear.name} />
          ) : (
            <div className="placeholder">🧥</div>
          )}
          <p>{outfit.outerwear.name}</p>
          <p className="color">Color: {outfit.outerwear.color}</p>
        </div>
      )}
      
      {outfit.dress ? (
        <div className="outfit-item dress">
          <h4>Dress</h4>
          {outfit.dress.image ? (
            <img src={outfit.dress.image} alt={outfit.dress.name} />
          ) : (
            <div className="placeholder">👗</div>
          )}
          <p>{outfit.dress.name}</p>
          <p className="color">Color: {outfit.dress.color}</p>
        </div>
      ) : (
        <>
          {outfit.top && (
            <div className="outfit-item top">
              <h4>Top</h4>
              {outfit.top.image ? (
                <img src={outfit.top.image} alt={outfit.top.name} />
              ) : (
                <div className="placeholder">👔</div>
              )}
              <p>{outfit.top.name}</p>
              <p className="color">Color: {outfit.top.color}</p>
            </div>
          )}
          
          {outfit.bottom && (
            <div className="outfit-item bottom">
              <h4>Bottom</h4>
              {outfit.bottom.image ? (
                <img src={outfit.bottom.image} alt={outfit.bottom.name} />
              ) : (
                <div className="placeholder">👖</div>
              )}
              <p>{outfit.bottom.name}</p>
              <p className="color">Color: {outfit.bottom.color}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OutfitDisplay