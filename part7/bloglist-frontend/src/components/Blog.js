import { useState } from 'react'
import { Button } from 'react-bootstrap'
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateLikes, setNotification, removeFromList }) => {
  const blogStyle = {
    color: 'black',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'lightgrey',
  }

  const [view, setView] = useState(false)

  const handleRemove = async () => {
    const removeConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(removeConfirm){
      blogService
        .remove(blog.id)
        .then(() => {
          removeFromList(blog)
          setNotification({ message: `Blog ${blog.title} by ${blog.author} removed`, color: 'green' })
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
        .catch(() => {
          setNotification({ message: 'Failed to delete blog', color: 'red' })
          setTimeout(() => {
            setNotification({})
          }, 5000)
        })
    }
  }

  return(
    <div style={blogStyle}>
      <div id='blog'>
        <p id='blogInfo' className='titleAndAuthor'><strong>{blog.title} {blog.author}</strong>
          <Button variant='primary'
            id='view-button'
            type={'button'}
            className={'nappula'}
            onClick = {() =>
              setView(!view)}
          >{view ? 'hide' : 'view'}</Button>
        </p>

      </div>
      { view &&
    <>
      <p className='url'>{blog.url}</p>
      <p className='likes'> likes {blog.likes}
        <Button variant='success'
          id='like-button'
          type={'button'}
          onClick = {() => updateLikes(blog)}
        >like</Button>
      </p>
      <div>{blog.user.name}</div>
      {blog.user.id === user.id &&
    <div>
      <Button variant='danger'
        id='remove-button'
        type={'button'}
        onClick={() => handleRemove()}
      >remove</Button>
    </div>
      }
    </>
      }
    </div>
  )
}

export default Blog