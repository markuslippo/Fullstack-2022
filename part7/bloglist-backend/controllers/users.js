const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', (request, response) => {
  User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    .then(users => {
      response.json(users)
    })
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const existing = await User.findOne({ username })

  if(existing) {
    return response.status(400).json({ error: 'username must be unique' })
  }
  if(username === undefined || password === undefined) {
    return response.status(400).json({ error: 'username or password missing' })
  } else if(username.length < 3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' })
  } else if(password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter