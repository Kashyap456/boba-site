import axios from 'axios'
import { useState, React } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from './Header'

const LoginForm = ({ logged }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signUp = async (user, pass) => {
    try {
      const response = await axios.post('/account/signup', { username: user, password: pass })
      navigate('/', { replace: true })
    } catch (e) {
      alert('Sign Up Failed, try a different username maybe')
    }
  }

  const logIn = async (user, pass) => {
    try {
      const response = await axios.post('/account/login', { username: user, password: pass })
      navigate('/', { replace: true })
    } catch (e) {
      alert('Login failed, please try again, or sign up.')
    }
  }

  return (
    <div>
      <Header />
      {logged && <h1>Log In</h1>}
      {!logged && <h1>Sign Up</h1>}
      <form
        className="flex flex-col content-center"
        onSubmit={e => {
          e.preventDefault()
          if (logged) {
            logIn(username, password)
          } else {
            signUp(username, password)
          }
          setUsername('')
          setPassword('')
        }}
      >
        <input
          placeholder="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
        <button
          type="submit"
          className="bg-stone-900 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded"
        >
          Enter
        </button>
      </form>
      <Link className="underline text-blue-400 hover:text-blue-800 visited:text-purple-600" to="/signup">Sign up here!</Link>
    </div>
  )
}

export default LoginForm
