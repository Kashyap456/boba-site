import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

const SignUpPage = () => (
  <div>
    <LoginForm logged={false} />
    <div className="flex flex-row">
      <h1 className="mr-2">Already have an account?</h1>
      <Link className="underline text-blue-400 hover:text-blue-800 visited:text-purple-600" to="/login">Log In!</Link>
    </div>
  </div>
)

export default SignUpPage
