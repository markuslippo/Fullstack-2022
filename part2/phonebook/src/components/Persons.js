import Person from "./Person"

const Persons = ({ persons }) => {
  const content = persons.map(p => 
    <div key={p.id}>
      <Person person={p} />
    </div>
    
    )
    return (
      <div>
        {content}
      </div>
    )
  }

  export default Persons