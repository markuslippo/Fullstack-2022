import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setNotification }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: 'wrong credentials', color: 'red' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    }
  }
  return(
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm