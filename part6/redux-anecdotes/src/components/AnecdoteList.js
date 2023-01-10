import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { makeNotification } from '../reducers/notificationReducer'

import { orderBy } from 'lodash'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.filter
      ? state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      : state.anecdotes)
    const orderedAnecdotes = orderBy(anecdotes, ['votes'], ['desc'])
    return(
    <div>
        {orderedAnecdotes

        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                dispatch(makeNotification(`Voted ${anecdote.content}`, 5))
                dispatch(voteAnecdote(anecdote))
              }}>vote</button>
            </div>
          </div>
        )}
    </div>
    )
}

export default AnecdoteList