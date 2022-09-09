// using headless.ui modal
import { useState, React } from 'react'
import { Dialog } from '@headlessui/react'
import axios from 'axios'

const Modal = ({
  state, setModal, title, updateState, id,
}) => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(1)

  return (
    <Dialog
      open={state}
      onClose={() => {
        setModal(false)
      }}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-sm mx-auto">
          <Dialog.Title>{title}</Dialog.Title>
          <form onSubmit={async e => {
            e.preventDefault()
            await axios.post('/api/stores/review', { id, review: { text, rating } })
            setText('')
            setRating(1)
            updateState()
            setModal(false)
          }}
          >
            <textarea value={text} placeholder="Enter your review here" onChange={e => setText(e.target.value)} />
            <select id="rating" name="rating" value={rating} onChange={e => setRating(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
