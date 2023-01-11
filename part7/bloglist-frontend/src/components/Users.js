import { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  const userStyle = {
    color: 'black',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'lightgrey',
  }

  useEffect(() => {
    userService.getAll().then(users => {
      console.log(users)
      setUsers(users)
    }
    )
  }, [])

  return (
    <div>
      <h4>Users</h4>
      {users
        .map( (user) =>
          <div key={user.id} style={userStyle}>
            <p><strong>username:</strong> {user.username}</p>
            <p><strong>name:</strong> {user.name}</p>
            <p><strong>number of blogs created:</strong> {user.blogs.length}</p>
          </div>
        )
      }
    </div>
  )
}

export default Users