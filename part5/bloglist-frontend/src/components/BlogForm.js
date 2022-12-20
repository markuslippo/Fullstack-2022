import { useState } from 'react'

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
      <h2>Create a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>title</label>
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={(event) => setTitle(event.target.value)}
            placeholder='write title here'
          />
        </div>
        <div>
          <label>author</label>
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
          <label>url</label>
          <input
            id='url'
            type='text'
            value={url}
            name='url'
            onChange={(event) => setUrl(event.target.value)}
            placeholder='write url here'
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm