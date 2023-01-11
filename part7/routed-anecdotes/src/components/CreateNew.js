import { useNavigate } from "react-router-dom"

import { useField } from "../hooks"

export const CreateNew = (props) => {

    const navigate = useNavigate()
  
    const content = useField('text')
    const author = useField('author')
    const info = useField('info')

    const handleReset = (e) => {
      e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input type={content.type} value={content.value} onChange={content.onChange} />
          </div>
          <div>
            author
            <input type={author.type} value={author.value} onChange={author.onChange} />
          </div>
          <div>
            url for more info
            <input type={info.type} value={info.value} onChange={info.onChange} />
          </div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
  }