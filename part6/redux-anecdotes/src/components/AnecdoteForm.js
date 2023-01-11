import { connect } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { makeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

    const handleAdd = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.makeNotification(`Added ${content}`, 5)
        props.createNew(content)
      }
    return (
    <div>
    <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
    )
}

export default connect(
  null,
  { createNew, makeNotification }
)(AnecdoteForm)