const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = await request.user
  const token = request.token

  if(!token)
    return response.status(401).json({ error: 'token missing or invalid' })

  if(body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(blog.likes === undefined)
    blog.likes = 0

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = await request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'no permission for this operation' })
  }


})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const searchBlog = await Blog.findById(id).populate('user', { id: 1 })
  if(!searchBlog) response.status(404).end()

  const body = request.body
  const blog = {
    author: body.author || blog.author,
    likes: body.likes !== undefined ? body.likes : blog.likes,
    title: body.title || blog.title,
    url: body.url || blog.url
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  if(updateBlog) {
    response.status(200).json(updateBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter