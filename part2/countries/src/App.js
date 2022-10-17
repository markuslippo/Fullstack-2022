import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from "./components/Search"
import Content from "./components/Content"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setNewSearch] = useState('')
  const [selected, selectCountry] = useState(undefined)

  const fetch = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(fetch, [])

  const handleSearchChange = event => {
  setNewSearch(event.target.value) 
  selectCountry(undefined)
  }

  return (
    <div>
      <Search search={search} onChange={handleSearchChange} />
      <Content 
      countries= {countries.filter(({ name }) => name.common.toLowerCase().includes(search.toLowerCase()))} 
      selected = {selected}
      selectCountry = {name => selectCountry(countries.find(country => country.name.common === name))}
      />
    </div>    
  )
}

export default App