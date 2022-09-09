import { Link } from 'react-router-dom'
import { React } from 'react'

const Header = ({
  logged, logOut, updateState, admin,
}) => (
  <div className="flex flex-row mb-2 bg-boba justify-between">
    <Link className="ml-2" to="/"><a className="text-2xl" href="/">Boba-Site</a></Link>
    <div className="flex flex-row">
      <div>
        {admin && <Link className="mr-2" to="/admin">ADMIN</Link>}
        {logged && (
        <button
          className="mr-2"
          type="button"
          onClick={() => {
            logOut()
            updateState()
          }}
        >
          Log Out
        </button>
        )}
        {(!logged) && (
        <Link to="/login"><a className="mr-2" href="/login">Login</a></Link>
        )}
      </div>
    </div>
  </div>
)

export default Header

/* <div className="flex flex-row justify-between bg-slate-300">
          <h1 className="text-2xl">CAMPUSWIRE LITE</h1>
          <div>
            {logged && (
              <button
                className=""
                type="button"
                onClick={() => {
                  logOut()
                  updateState()
                }}
              >
                Log Out
              </button>
            )}
          </div>
          <Link to="/admin">ADMIN</Link>
        </div> */
