import { useState, React, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Wrapper } from '@googlemaps/react-wrapper'
import StoreScroller from './StoreScroller'
import Modal from './Modal'
import Header from './Header'
import MapPage from './MapPage'

const HomePage = () => {
  const [logged, setLogged] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [modalState, setModal] = useState(false)
  const [stores, setStores] = useState([])
  const [coords, setCoords] = useState({ lat: 39, lng: -75 })
  const navigate = useNavigate()
  const { id } = useParams()

  const updateState = async () => {
    try {
      const qs = await axios.get('/api/stores')
      const loggedin = await axios.get('/api/stores/logged')
      const adminget = await axios.get('/account/admin')
      setStores(qs.data)
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
    if (id) {
      const store = stores.find(element => element._id === id)
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ address: store.address }, res => {
        const lat = res[0].geometry.location.lat()
        const lng = res[0].geometry.location.lng()
        console.log(lat)
        setCoords({ lat, lng })
      })
    }
    const intervalID = setInterval(() => {
      updateState()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [id])

  return (
    <div className="container mx-auto">
      <Modal state={modalState} setModal={setModal} title="Add a question!" />
      <div className="flex flex-col">
        <Header logged={logged} logOut={logOut} updateState={updateState} admin={admin} />
        <div className="mt-12" />
        <div className="flex flex-row gap-12">
          <Wrapper apiKey="AIzaSyDo_l_ALRRNrou5PI2SA4gzvUvd1J_YqSw">
            <MapPage pos={coords} />
            <StoreScroller stores={stores} setModal={setModal} />
          </Wrapper>
        </div>
      </div>
    </div>
  )
}

export default HomePage
