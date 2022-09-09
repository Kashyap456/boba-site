import { useState, useEffect, React } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'

const AdminPage = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [imgurl, setImg] = useState('')
  const [logged, setLogged] = useState(false)
  const [admin, setAdmin] = useState(false)
  const navigate = useNavigate()

  const addStore = async (sname, saddress, simgurl) => {
    try {
      const response = await axios.post('/api/stores/addstore', { name: sname, address: saddress, imgurl: simgurl })
      navigate('/', { replace: true })
    } catch (e) {
      alert('Login failed, please try again, or sign up.')
    }
  }

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
    updateState()
    const intervalID = setInterval(() => {
      updateState()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div>
      <Header logged={logged} admin={admin} updateState={updateState} logOut={logOut} />
      <form
        className="flex flex-col content-center"
        onSubmit={e => {
          e.preventDefault()
          addStore(name, address, imgurl)
          setName('')
          setAddress('')
          setImg('')
        }}
      >
        <input
          placeholder="Name"
          value={name}
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <input
          placeholder="Address"
          value={address}
          onChange={e => {
            setAddress(e.target.value)
          }}
        />
        <input
          placeholder="Image Link"
          value={imgurl}
          onChange={e => {
            setImg(e.target.value)
          }}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enter
        </button>
      </form>
    </div>
  )
}

export default AdminPage
