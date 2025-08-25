import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddItem() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: 'top',
    color: '',
    description: '',
    image: '',
    canLayer: false,
    occasion: 'casual',
    weather: 'mild'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.color) {
      alert('Please fill in at least the name and color fields')
      return
    }

    const newItem = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }

    const existing = localStorage.getItem('outfits')
    const outfits = existing ? JSON.parse(existing) : []
    outfits.push(newItem)
    localStorage.setItem('outfits', JSON.stringify(outfits))

    alert('Item added successfully!')
    navigate('/closet')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({...formData, image: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageCapture = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({...formData, image: reader.result})
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="add-item">
      <h2>Add New Item to Closet</h2>
      
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label>
            Name:
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Blue Striped Shirt"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Type:
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="dress">Dress</option>
              <option value="outerwear">Outerwear (Jacket/Coat)</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Color:
            <input 
              type="text" 
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              placeholder="e.g., Blue, Red, Floral"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Description:
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your item or draw it..."
              rows="3"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Occasion:
            <select 
              value={formData.occasion}
              onChange={(e) => setFormData({...formData, occasion: e.target.value})}
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="business">Business</option>
              <option value="party">Party</option>
              <option value="athletic">Athletic</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Best for Weather:
            <select 
              value={formData.weather}
              onChange={(e) => setFormData({...formData, weather: e.target.value})}
            >
              <option value="hot">Hot</option>
              <option value="mild">Mild</option>
              <option value="cold">Cold</option>
              <option value="rainy">Rainy</option>
              <option value="any">Any</option>
            </select>
          </label>
        </div>

        {(formData.type === 'top' || formData.type === 'outerwear') && (
          <div className="form-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={formData.canLayer}
                onChange={(e) => setFormData({...formData, canLayer: e.target.checked})}
              />
              Can be layered (e.g., jacket, cardigan)
            </label>
          </div>
        )}

        <div className="form-group">
          <label>
            Add Image:
            <div className="image-options">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-label">
                Upload from device
              </label>
              
              <input 
                type="file" 
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                id="camera-capture"
              />
              <label htmlFor="camera-capture" className="file-label">
                Take a photo
              </label>
            </div>
          </label>
        </div>

        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Preview" />
            <button 
              type="button" 
              onClick={() => setFormData({...formData, image: ''})}
              className="remove-image"
            >
              Remove Image
            </button>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-btn">Add to Closet</button>
          <button type="button" onClick={() => navigate('/closet')} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddItem