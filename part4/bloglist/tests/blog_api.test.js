const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await api
    .post('/api/users')
    .send(helper.initialUsers[0])

  await api
    .post('/api/login')
    .send(helper.credentials[0])
    .expect(response => { token = response.body.token })

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.initialBlogs[0])
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(helper.initialBlogs[1])
})

describe('number of blogs and their type', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('identification of a blog', () => {
  test('blog has property id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('incorrect POST operations', () => {

  test('POST returns 400 Bad Request and blog is not added if title missing ', async () => {
    const newBlog =
          {
            author: 'Matti',
            url: 'http://blogisivu.fi',
            likes: 2,
          }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('POST returns 400 Bad Request and blog is not added if url missing ', async () => {
    const newBlog =
          {
            title: 'Koodiblogi',
            author: 'Matti',
            likes: 2,
          }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})



describe('POST to /api/blogs with valid blogs', () => {
  test('POST succeeds with valid data & authorized user', async () => {
    const newBlog =
        {
          title: 'Toimiva blogi',
          author: 'Matti',
          url: 'http://blogisivu.fi',
          likes: 2,
        }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Toimiva blogi')
  })

  test('POST fails without authorization (status code 401)', async () => {
    const newBlog =
        {
          title: 'Toimiva blogi',
          author: 'Matti',
          url: 'http://blogisivu.fi',
          likes: 2,
        }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('adding a blog without like property', () => {
  test('blog has 0 likes', async () => {
    const newBlog =
            {
              title: 'Nolla tykkäystä',
              author: 'Matti',
              url: 'http://blogisivu.fi',
            }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })
})


describe('updating', () => {
  test('updated likes are correct', async () => {
    const starting_blogs = await helper.blogsInDb()
    const five_likes = starting_blogs[0]

    await api
      .put(`/api/blogs/${five_likes.id}`)
      .send({ likes: 7 })
      .expect(200)

    const ending_blogs = await helper.blogsInDb()
    const seven_likes = ending_blogs[0]

    expect(ending_blogs).toHaveLength(helper.initialBlogs.length)
    expect(seven_likes.likes).toBe(7)
  })
})



describe('deleting', () => {

  let unvalidToken = null

  test('deleting is successful', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deletedBlog = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).not.toContain(deletedBlog.title)
    expect(blogsAtEnd.length).toBe(blogsAtStart.length-1)
  })
  test('deleting with unvalid authorization token fails', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deletedBlog = blogsAtStart[0]

    await api
      .post('/api/users')
      .send(helper.initialUsers[1])
    await api
      .post('/api/login')
      .send(helper.credentials[1])
      .expect(response => { unvalidToken = response.body.token })
    await api
      .delete(`/api/blogs/${deletedBlog.id}`)
      .set('Authorization', `bearer ${unvalidToken}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain(deletedBlog.title)
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})