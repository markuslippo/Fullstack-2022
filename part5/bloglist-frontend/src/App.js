import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async() => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  // ADD BLOG

  const addBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()

    console.log(blogObject)
    const createdBlog = await blogService.create(blogObject)
    const newBlogs = [...blogs, createdBlog]
    setBlogs(newBlogs)
  }


  // UPDATE BLOG

  const updateBlogLikes = async (blog) => {
    const { id, user, likes, author, title, url } = blog
    const body = {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url
    }

    const newBlog = await blogService.like(id, body)
    const newBlogs = blogs.map((singleblog) => {
      if(singleblog.id === newBlog.id){
        return {
          ...singleblog,
          likes: newBlog.likes
        }
      }
      return singleblog
    })
    setBlogs(newBlogs)
  }


  // REMOVE BLOG

  const removeFromList = async(blog) => {
    const newBlogs = blogs.filter((singleblog) => singleblog.id !== blog.id)
    setBlogs(newBlogs)
  }


  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} color={notification.color}/>
      {user === null ?
        <LoginForm setUser={setUser} setNotification={setNotification}/>
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          <br/><br/>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} setNotification={setNotification} user={user}/>
          </Togglable>

          <ul>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} user={user} updateLikes={updateBlogLikes} setNotification={setNotification} removeFromList={removeFromList}/>
              )}
          </ul>
        </div>
      }
    </div>
  )
}

export default App
