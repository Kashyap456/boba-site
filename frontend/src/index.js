import { createRoot } from 'react-dom/client'
import React from 'react'
import {
  BrowserRouter,
  Routes, Route, Outlet, Link,
} from 'react-router-dom'
import LoginForm from './Components/LoginForm'
import App from './App'
import SignUpPage from './Components/SignUpPage'
import HomePage from './Components/HomePage'
import AdminPage from './Components/AdminPage'
import StorePage from './Components/StorePage'
import MapPage from './Components/MapPage'

const app = document.getElementById('app')
const root = createRoot(app)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/:id" />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginForm logged />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/stores" element={<StorePage />}>
          <Route path="/stores/:id" />
        </Route>
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

)
