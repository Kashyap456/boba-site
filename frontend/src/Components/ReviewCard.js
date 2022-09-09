import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ReviewCard = ({ review }) => (
  <div className="mb-2 border-2 border-black rounded-md">
    <h1>{review.author}</h1>
    <h1>{review.rating}</h1>
    <h1>{review.text}</h1>
  </div>
)

export default ReviewCard
