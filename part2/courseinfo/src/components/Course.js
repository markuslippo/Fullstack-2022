const Course = ({course}) => {
    const Header = ({header}) => {
      return (
        <div>
          <h1>{header}</h1>
        </div>
      )
    }
    const Content = ({part}) => {
      return (
        <div>
          <p>{part.name} {part.exercises}</p>
        </div>
      )
    }
    const Sum = ({parts}) => {
      const points = parts.map( part => part.exercises)
      const sum = points.reduce((prev, curr) => prev + curr, 0 )
      return (
        <div>
          <b>total of {sum} exercises</b>
        </div>
      )
    }

return (
  <div>
    <Header header={course.name} />
    {course.parts.map( part => (
      <Content part={part}/>
    ))}
    <Sum parts={course.parts} />
  </div>
)
}

export default Course