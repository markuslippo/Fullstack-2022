import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({number}) => <p> has {number} votes </p>
const MostVotes = ({anecdotes, votes}) => {
  const index = votes.indexOf(Math.max.apply(Math, votes))
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p> {anecdotes[index]} </p> 
      <p> has {votes[index]} </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState( [0, 0, 0, 0, 0, 0, 0] )

  const selectNext = () => { 
    setSelected(Math.floor(Math.random() * 7 )
    )
  }

  const vote = () => {
    let points = [...votes]
    points[selected]++
    setVote(points)
  }
  return (
    <div>
     <p> {anecdotes[selected]} </p>
     <StatisticLine number={ votes[selected] }/>
      <Button onClick={vote} text='vote'/>
      <Button onClick={selectNext} text='next anecdote' />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
