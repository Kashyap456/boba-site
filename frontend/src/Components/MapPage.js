import {
  React, useRef, useEffect, useState,
} from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { GoogleMap, Marker } from '@react-google-maps/api'
import axios from 'axios'
import BobaMap from './BobaMap'
import Header from './Header'

const MapPage = ({ pos }) => {
  const [stores, setStores] = useState([])
  const [logged, setLogged] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [coords, setCoords] = useState({})

  const updateState = async () => {
    try {
      const sto = await axios.get('/api/stores')
      const loggedin = await axios.get('/api/stores/logged')
      const adminget = await axios.get('/account/admin')
      const { data } = sto
      setStores(data)
      setLogged(loggedin.data)
      setAdmin(adminget.data)
    } catch (e) {
      console.log(e)
    }
  }

  const logOut = async () => {
    try {
      const logout = await axios.post('/account/logout', {})
      // console.log(logout)
    } catch (e) {
      // console.log(e)
    }
  }

  useEffect(() => {
    updateState()
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
      },
    )
    const intervalID = setInterval(() => {
      updateState()
    }, 5000)
    return () => clearInterval(intervalID)
  }, [])

  const containerStyle = {
    width: '50vw',
    height: '50vh',
  }
  const center = {
    lat: 35.6804,
    lng: 139.769,
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col">
        {/* <Header logged={logged} admin={admin} logOut={logOut} updateState={updateState} /> */}
        <div className="mt-12">
          <Wrapper apiKey="AIzaSyDo_l_ALRRNrou5PI2SA4gzvUvd1J_YqSw">
            <GoogleMap mapContainerStyle={containerStyle} zoom={15} center={pos}>
              <Marker position={pos} />
            </GoogleMap>
          </Wrapper>
        </div>
      </div>
    </div>

  )
}

export default MapPage
