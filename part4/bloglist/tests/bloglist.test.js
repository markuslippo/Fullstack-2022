const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when blog list is empty likes is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('total likes returns 36', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('favorite blog is the first blog with 12 likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('empty blog list returns empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  const one = [
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]
  test('bloglist with one blog returns that blog', () => {
    const result = listHelper.favoriteBlog(one)
    expect(result).toBe(one[0])
  })
})

describe('most blogs', () => {

  const mostBlogs = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  test('mostBlogs calculated correctly with test bloglist', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogs)
  })
  test('mostBlogs calculated correctly with only one blogger', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogs)
  })

  test('mostBlogs returns empty object if empty blog', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
})

describe('most likes', () => {

  const mostLikes = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  test('mostLikes calculated correctly with test bloglist', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikes)
  })
  test('mostLikes calculated correctly with only one blogger', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikes)
  })

  test('mostLikes returns empty object if empty blog', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
})