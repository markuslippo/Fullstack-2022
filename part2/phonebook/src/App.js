import { useState, useEffect } from 'react'

import Persons from "./components/Persons"
import Filter from "./components/Filter"
import AddForm from "./components/AddForm"
import Notification from './components/Notification'

import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson= persons.find(({name}) => name === newName)

    if(existingPerson !== undefined) {
     if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) 
        updatePerson(existingPerson, newNumber)
    } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personService
          .create(newPerson)
          .then(person => {
            setPersons([...persons, person])
            setNewName('')
            setNewNumber('')
            setNotification({message: `Added ${newName}`, color: 'green'})
            setTimeout(() => setNotification({}), 5000)
        })
          .catch(error => {
            console.log(error)
            setNotification({message: `Failed to add ${newName}`, color: 'red'})
            setTimeout(()=> setNotification({}), 5000)
        })

    }
  }

  const updatePerson = (person, number) => {
    const newPerson = {...person, number}
    personService
      .update(person.id, newPerson)
      .then(result => {
        const newPersons = persons.map(p => {
          if(p.id === person.id) return result
          else return p
        })
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
        setNotification({message: `Updated ${newName}`, color: 'green'})
        setTimeout(()=> setNotification({}), 5000)
      })
      .catch(error => {
        console.log(error)
        setNotification({message: 'Failed to update person', color: 'red'})
        setTimeout(()=> setNotification({}), 5000)
      })
  }

  const remove = (name, id) => {
    personService.remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      setNotification({message: `Removed ${name}`, color: 'red'})
      setTimeout(()=> setNotification({}), 5000)
    })
    .catch(error => {
      console.log(error)
      setNotification({message: `Information of ${name} has already been removed from server`, color: 'red'})
      setTimeout(()=> setNotification({}), 5000)
    })
  }

  const removeNotif = (name, id) => {
    if(window.confirm(`Delete ${name} ?`))
        remove(name, id)
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} color={notification.color} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <AddForm onSubmit={addPerson} name={newName} number={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons 
      persons={persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))}
      deletePerson={removeNotif}
      />
    </div>
    
  )
}

export default App