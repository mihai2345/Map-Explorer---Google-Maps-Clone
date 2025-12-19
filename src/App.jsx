import { useState } from 'react'
import MapContainer from './components/MapContainer'
import LocationInput from './components/LocationInput'
import SearchBar from './components/SearchBar'
import './App.css'

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function App() {
  const [location1, setLocation1] = useState(null)
  const [location2, setLocation2] = useState(null)
  const [searchedLocation, setSearchedLocation] = useState(null)
  const [isSearching1, setIsSearching1] = useState(false)
  const [isSearching2, setIsSearching2] = useState(false)
  const [isSearchingLocation, setIsSearchingLocation] = useState(false)
  const [error1, setError1] = useState(null)
  const [error2, setError2] = useState(null)
  const [searchError, setSearchError] = useState(null)

  const geocodeLocation = async (query) => {
    if (!query.trim()) {
      return null
    }

    try {
      const encodedQuery = encodeURIComponent(query)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1&accept-language=en`,
        {
          headers: {
            'User-Agent': 'MapExplorer/1.0',
            'Accept-Language': 'en'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Search failed')
      }
      
      const data = await response.json()
      
      if (data && data.length > 0) {
        const result = data[0]
        return {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          name: result.display_name
        }
      }
      return null
    } catch (error) {
      console.error('Geocoding error:', error)
      throw error
    }
  }

  const handleLocation1Search = async (query) => {
    setError1(null)
    setIsSearching1(true)
    // Clear searched location when using distance calculator
    setSearchedLocation(null)
    
    try {
      const location = await geocodeLocation(query)
      if (location) {
        setLocation1(location)
      } else {
        setError1('Location not found. Try a different search term.')
        setLocation1(null)
      }
    } catch (error) {
      setError1('Failed to search. Please try again.')
      setLocation1(null)
    } finally {
      setIsSearching1(false)
    }
  }

  const handleLocation2Search = async (query) => {
    setError2(null)
    setIsSearching2(true)
    // Clear searched location when using distance calculator
    setSearchedLocation(null)
    
    try {
      const location = await geocodeLocation(query)
      if (location) {
        setLocation2(location)
      } else {
        setError2('Location not found. Try a different search term.')
        setLocation2(null)
      }
    } catch (error) {
      setError2('Failed to search. Please try again.')
      setLocation2(null)
    } finally {
      setIsSearching2(false)
    }
  }

  const handleLocationSearch = async (query) => {
    setSearchError(null)
    setIsSearchingLocation(true)
    // Clear distance calculator locations when using search location
    setLocation1(null)
    setLocation2(null)
    
    try {
      const location = await geocodeLocation(query)
      if (location) {
        setSearchedLocation(location)
      } else {
        setSearchError('Location not found. Try a different search term.')
        setSearchedLocation(null)
      }
    } catch (error) {
      setSearchError('Failed to search. Please try again.')
      setSearchedLocation(null)
    } finally {
      setIsSearchingLocation(false)
    }
  }

  const distance = location1 && location2 
    ? calculateDistance(location1.lat, location1.lng, location2.lat, location2.lng)
    : null

  return (
    <div className="app">
      <div className="sidebar">
        <h1 className="main-title">🗺️ Map Explorer</h1>
        
        <div className="general-search-section">
          <label className="section-label">Search Location</label>
          <SearchBar 
            onSearch={handleLocationSearch} 
            isSearching={isSearchingLocation}
            placeholder="Search for any location..."
          />
          {searchError && (
            <div className="error-message">
              ⚠️ {searchError}
            </div>
          )}
          {searchedLocation && (
            <div className="location-display">
              <strong>📍 {searchedLocation.name}</strong>
            </div>
          )}
        </div>

        <div className="distance-calculator-section">
          <h2 className="section-title">📏 Distance Calculator</h2>
          
          <div className="location-inputs">
            <div className="location-input-group">
              <label>Location 1</label>
              <LocationInput 
                onSearch={handleLocation1Search} 
                isSearching={isSearching1}
                placeholder="Enter first location..."
              />
              {error1 && (
                <div className="error-message">
                  ⚠️ {error1}
                </div>
              )}
              {location1 && (
                <div className="location-display">
                  <strong>📍 {location1.name}</strong>
                </div>
              )}
            </div>

            <div className="location-input-group">
              <label>Location 2</label>
              <LocationInput 
                onSearch={handleLocation2Search} 
                isSearching={isSearching2}
                placeholder="Enter second location..."
              />
              {error2 && (
                <div className="error-message">
                  ⚠️ {error2}
                </div>
              )}
              {location2 && (
                <div className="location-display">
                  <strong>📍 {location2.name}</strong>
                </div>
              )}
            </div>
          </div>

          {distance !== null && (
            <div className="distance-info">
              <h3>Distance</h3>
              <div className="distance-value">
                {distance.toFixed(2)} km
              </div>
              <div className="distance-value-miles">
                {(distance * 0.621371).toFixed(2)} miles
              </div>
            </div>
          )}

          {!location1 || !location2 ? (
            <div className="empty-state">
              Enter two locations to calculate the distance between them
            </div>
          ) : null}
        </div>
      </div>
      <div className="map-wrapper">
        <MapContainer
          location1={location1}
          location2={location2}
          searchedLocation={searchedLocation}
        />
      </div>
    </div>
  )
}

export default App
