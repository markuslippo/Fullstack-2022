import { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog, setNotification, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: user.id
    })
    setNotification({ message: `a new blog ${title} by ${author} added`, color: 'green' })
    setTimeout(() => {
      setNotification({})
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <h4>Create a blog</h4>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={(event) => setTitle(event.target.value)}
            placeholder='write title here'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='write author here'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            id='url'
            type='text'
            value={url}
            name='url'
            onChange={(event) => setUrl(event.target.value)}
            placeholder='write url here'
          />
        </Form.Group>
        <Button variant="primary" id='create-button' type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm