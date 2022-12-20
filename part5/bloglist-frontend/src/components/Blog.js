import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, user, updateLikes, setNotification, removeFromList }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        <p id='blogInfo' className='titleAndAuthor'>{blog.title} {blog.author}
          <input
            id='view-button'
            type={'button'}
            value={view ? 'hide' : 'view'}
            className={'nappula'}
            onClick = {() =>
              setView(!view)}
          />
        </p>

      </div>
      { view &&
    <>
      <p className='url'>{blog.url}</p>
      <p className='likes'> likes {blog.likes}
        <input
          id='like-button'
          type={'button'}
          value={'like'}
          onClick = {() => updateLikes(blog)}
        />
      </p>
      <div>{blog.user.name}</div>
      {blog.user.id === user.id &&
    <div>
      <input
        id='remove-button'
        type={'button'}
        value={'remove'}
        onClick={() => handleRemove()}
      />
    </div>
      }
    </>
      }
    </div>
  )
}

export default Blog