import {
  React, useRef, useState, useEffect,
} from 'react'

const BobaMap = () => {
  const ref = useRef(null)
  const [map, setMap] = useState()

  useEffect(() => {
    // eslint-disable-next-line no-new
    if (!map) {
      setMap(new window.google.maps.Map(ref.current, { center: { lat: 32, lng: 32 }, zoom: 4 }))
    }
  }, [map])

  return <div ref={ref} id="map" style={{ flexGrow: '1', height: '100%', width: '100%' }} />
}

export default BobaMap
