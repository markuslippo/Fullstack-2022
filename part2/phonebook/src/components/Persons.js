import Person from "./Person"

const Persons = ({ persons, deletePerson }) => {
  const listofpersons = persons.map(p => 
    <div key={p.id}>
      <Person 
      person={p} 
      deletePerson={() => deletePerson(p.name, p.id)} />
    </div>

    )
    return (
      <div>
        {listofpersons}
      </div>
    )
  }

  export default Persons