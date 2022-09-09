import {
  useState, React, useEffect, useCallback,
} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import ReviewScroller from './ReviewScroller'
import Modal from './Modal'

const StorePage = () => {
  const { id } = useParams()
  const [store, setStore] = useState({})
  const [logged, setLogged] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [modalState, setModal] = useState(false)

  const updateState = async () => {
    try {
      const loggedin = await axios.get('/api/stores/logged')
      const adminget = await axios.get('/account/admin')
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
    const getStore = async () => {
      const gstore = await axios.post('/api/stores/getstore', { id })
      setStore(gstore.data)
    }
    getStore()
    updateState()
    const intervalID = setInterval(() => {
      updateState()
      getStore()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [id])

  return (
    <div>
      <Header logged={logged} admin={admin} updateState={updateState} logOut={logOut} />
      <Modal state={modalState} setModal={setModal} updateState={updateState} title="Add a question!" id={store._id} />
      <div>
        <div className="flex flex-row">
          <h1 className="text-4xl mr-10">{store.name}</h1>
          <h1 className="text-4xl">{`${store.rating}/5`}</h1>
        </div>
        <img className="max-w-2xl" src={store.imgurl} alt="https://cdn.abcotvs.com/dip/images/10520787_041621-boba.png" />
      </div>
      <ReviewScroller reviews={store.reviews} logged={logged} setModal={setModal} />
    </div>
  )
}

export default StorePage
