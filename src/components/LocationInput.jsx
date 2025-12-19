import { useState } from 'react'
import './LocationInput.css'

function LocationInput({ onSearch, isSearching, placeholder }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !isSearching) {
      onSearch(query)
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <form className="location-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="location-input"
        disabled={isSearching}
      />
      <button type="submit" className="location-search-button" disabled={isSearching}>
        {isSearching ? '⏳' : '🔍'}
      </button>
    </form>
  )
}

export default LocationInput

