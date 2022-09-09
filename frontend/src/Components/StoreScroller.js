import {
  React, useState, useEffect, useMemo,
} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { DistanceMatrixService } from '@react-google-maps/api'
import StoreCard from './StoreCard'
import API_KEY from '../../../backend/keys'

const sortFunctions = (field, asc) => (a, b) => asc * (a[field] - b[field])

const StoreScroller = ({ stores, logged, setModal }) => {
  const navigate = useNavigate()
  const [sort, setSort] = useState('rating')
  const [asc, setAsc] = useState(-1)
  const [coords, setCoords] = useState({})
  const storearray = useMemo(() => stores && [...stores].sort(sortFunctions(sort, asc)), [stores, sort, asc])
  const [array, setArray] = useState(storearray)

  const service = new google.maps.DistanceMatrixService()

  return (
    <div className="max-h-screen w-full overflow-y-scroll">
      <h1 className="text-6xl">Rankings</h1>
      <button
        type="button"
        className="bg-stone-900 hover:bg-stone-500 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          navigator.geolocation.getCurrentPosition(
            position => {
              if (storearray) {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                storearray.forEach(e => {
                  service.getDistanceMatrix({
                    origins: [{ lat, lng }],
                    destinations: [e.address],
                    travelMode: 'DRIVING',
                  }, (res, status) => {
                    const { rows } = res
                    const { elements } = rows[0]
                    const { distance } = elements[0]
                    const { value, text } = distance
                    e.distance = value
                    e.disttext = text
                  })
                })
              }
            },
          )
          setArray(storearray)
        }}
      >
        Refresh Rankings
      </button>
      <div>
        <select id="sort" name="sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="rating">Rating</option>
          <option value="distance">Distance</option>
        </select>
        <select id="asc" name="asc" value={asc} onChange={e => setAsc(e.target.value)}>
          <option value={-1}>Descending</option>
          <option value={1}>Ascending</option>
        </select>
      </div>
      <div>
        {array && array.sort(sortFunctions(sort, asc)).map(q => <StoreCard store={q} />)}
      </div>
    </div>
  )
}

export default StoreScroller
