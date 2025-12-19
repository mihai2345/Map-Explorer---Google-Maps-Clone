import { useEffect } from 'react'
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import './MapContainer.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to fit map bounds to show locations
function FitBounds({ location1, location2, searchedLocation }) {
  const map = useMap()
  
  useEffect(() => {
    // Priority: searched location first, then distance calculator
    if (searchedLocation) {
      // Show only searched location
      map.setView([searchedLocation.lat, searchedLocation.lng], 13)
    } else if (location1 && location2) {
      // Show both distance calculator locations
      const bounds = L.latLngBounds(
        [location1.lat, location1.lng],
        [location2.lat, location2.lng]
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    } else if (location1) {
      map.setView([location1.lat, location1.lng], 13)
    } else if (location2) {
      map.setView([location2.lat, location2.lng], 13)
    }
  }, [location1, location2, searchedLocation, map])
  
  return null
}

function MapContainer({ location1, location2, searchedLocation }) {
  const defaultCenter = [51.505, -0.09] // London default
  const defaultZoom = 2

  // Create polyline path if both locations exist
  const polylinePath = location1 && location2
    ? [[location1.lat, location1.lng], [location2.lat, location2.lng]]
    : []

  return (
    <div className="map-container">
      <LeafletMap
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FitBounds location1={location1} location2={location2} searchedLocation={searchedLocation} />
        
        {/* Show only searched location if it exists, otherwise show distance calculator locations */}
        {searchedLocation ? (
          <Marker position={[searchedLocation.lat, searchedLocation.lng]}>
            <Popup>
              <strong>Searched Location</strong>
              <br />
              {searchedLocation.name}
              <br />
              {searchedLocation.lat.toFixed(4)}, {searchedLocation.lng.toFixed(4)}
            </Popup>
          </Marker>
        ) : (
          <>
            {location1 && (
              <Marker position={[location1.lat, location1.lng]}>
                <Popup>
                  <strong>Location 1</strong>
                  <br />
                  {location1.name}
                  <br />
                  {location1.lat.toFixed(4)}, {location1.lng.toFixed(4)}
                </Popup>
              </Marker>
            )}
            
            {location2 && (
              <Marker position={[location2.lat, location2.lng]}>
                <Popup>
                  <strong>Location 2</strong>
                  <br />
                  {location2.name}
                  <br />
                  {location2.lat.toFixed(4)}, {location2.lng.toFixed(4)}
                </Popup>
              </Marker>
            )}

            {/* Show line between location1 and location2 if both exist */}
            {polylinePath.length > 0 && (
              <Polyline
                positions={polylinePath}
                color="#667eea"
                weight={3}
                opacity={0.7}
                dashArray="10, 10"
              />
            )}
          </>
        )}
      </LeafletMap>
    </div>
  )
}

export default MapContainer
