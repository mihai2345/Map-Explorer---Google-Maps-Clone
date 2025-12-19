import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a location (e.g., Paris, London, New York)..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  )
}

export default SearchBar

