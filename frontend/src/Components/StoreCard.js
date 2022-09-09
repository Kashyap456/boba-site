import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const StoreCard = ({ store, states }) => {
  console.log(store)
  return (
    <div className="mb-2 border-2 border-black rounded-md flex flex-row justify-between">
      <div>
        <Link
          to={`stores/${store._id}`}
        >
          {`Name: ${store.name}`}

        </Link>
        <h1>{`Rating: ${store.rating}/5`}</h1>
        <h1>{`Distance: ${store.disttext}`}</h1>
      </div>
      <Link to={`${store._id}`}>View on Map</Link>
    </div>
  )
}

export default StoreCard
