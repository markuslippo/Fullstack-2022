import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content, id) => {
    const object = { content: content, id: id, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateVote = async (oldAnecdote) => {
    const response = await axios.put(`${baseUrl}/${oldAnecdote.id}`, {...oldAnecdote, votes: oldAnecdote.votes + 1})
    return response.data
}

export default { getAll, createNew, updateVote }