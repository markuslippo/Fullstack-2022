export const Anecdote = ({ anecdote }) => {
  
    return(
      <div>
        <h2>{`${anecdote.content}`} by {`${anecdote.author}`}</h2>
        <div>has {`${anecdote.votes}`} votes</div>
        for more info see <a href={`${anecdote.info}`}>{`${anecdote.info}`}</a>
      </div>
      )
  }