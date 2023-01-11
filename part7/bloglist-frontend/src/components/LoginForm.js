import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant='primary' id='login-button' type='submit'>login</Button>
      </Form>
    </div>
  )
}

export default LoginForm