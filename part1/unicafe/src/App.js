import { useState } from 'react'


const Header = ({text}) => {
  return (
    <div>
      <h1> {text}</h1>
    </div>
  )
  }
  
  const Statistic = ({good, bad, neutral}) => {
    if((good+bad+neutral)==0) {
      return (
        <div>
          <p> No feedback given</p>
        </div>
      )
    } else {
    return (
      <div>
        <table>
          <tbody>
          <StatisticLine text="good" number={good} /> 
          <StatisticLine text="neutral" number={neutral} /> 
          <StatisticLine text="bad" number={bad} />
          <StatisticLine text="all" number={good+neutral+bad} />
          <StatisticLine text="average" number={(good-bad)/(good+neutral+bad)} /> 
          <StatisticLine text="positive" number={(good/(good+neutral+bad))+ " %"} />
          </tbody>
        </table>
      </div>
  
    )
    }
  }

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({number, text}) => <tr><td>{text}</td><td>{number}</td></tr>
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text="give feedback" />
      <Button 
       onClick={increaseGood}
       text='good'
      />
      <Button
      onClick={increaseNeutral}
      text='neutral'
      />
      <Button
      onClick={increaseBad}
      text='bad'
      />
      <Header text="statistics" />
      <Statistic good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App