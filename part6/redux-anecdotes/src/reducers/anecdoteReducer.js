import {createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) { 
      const votedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
        )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content, getId())
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (oldAnecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateVote(oldAnecdote)
    dispatch(vote(newAnecdote))
  }
}

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer