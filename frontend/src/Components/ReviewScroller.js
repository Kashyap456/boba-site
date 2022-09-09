import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ReviewCard from './ReviewCard'

const ReviewScroller = ({ reviews, logged, setModal }) => {
  const navigate = useNavigate()
  return (
    <div className="max-h-screen w-full overflow-y-scroll">
      {(!logged) && (
      <button
        className="mb-2 w-full bg-stone-900 hover:bg-stone-500 text-white font-bold py-2 px-4"
        type="button"
        onClick={() => {
          navigate('../login', { replace: true })
        }}
      >
        Log in to add a review!
      </button>
      )}
      {(logged) && (
      <button
        className="mb-2 w-full bg-stone-900 hover:bg-stone-500 text-white font-bold py-2 px-4"
        type="button"
        onClick={() => {
          setModal(true)
        }}
      >
        Add or update your review!
      </button>
      )}
      {reviews && reviews.map(q => <ReviewCard review={q} />)}
    </div>
  )
}

export default ReviewScroller
