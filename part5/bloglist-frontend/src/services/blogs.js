import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const generateHeader = (token) => ({
  Authorization: token,
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async(newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(
    baseUrl,
    newObject,
    config
  )
  return request.data
}

const like = async (id, body) => {
  const request = await axios.put(
    `${baseUrl}/${id}`,
    body,
    { headers: generateHeader(token) },
  )
  return request.data
}

const remove = async (id) => {
  const request = await axios.delete(
    `${baseUrl}/${id}`,
    { headers: generateHeader(token) },
  )
  return request.data
}

export default { getAll, setToken, create, like, remove }