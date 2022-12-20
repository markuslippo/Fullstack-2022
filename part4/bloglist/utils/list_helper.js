var _ = require('lodash')

const totalLikes = (blogs) => {
  const sum = blogs.reduce((prev, blog) => {
    return prev + blog.likes
  }, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  if(blogs.length > 0){
    const favorite = blogs.reduce(
      (prev, current) => {
        return prev.likes > current.likes ? prev : current
      }
    )
    return favorite
  } else {
    return {}
  }
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return {}
  const blogAmount = _.countBy(blogs, 'author')
  const authorBlogs = Object.keys(blogAmount).map(key => ({ author: key, blogs: blogAmount[key] }))
  return _.maxBy(authorBlogs, 'blogs')
}

const mostLikes = (blogs) => {
  if (!blogs.length) return {}

  const authorLikes = []
  blogs.forEach(b => {
    const index = authorLikes.findIndex(a => a.author === b.author)
    if (index === -1) authorLikes.push({ author: b.author, likes: b.likes })
    else {
      authorLikes[index] = {
        author: b.author,
        likes: b.likes + authorLikes[index].likes
      }
    }
  })
  const maxLikes = _.maxBy(authorLikes, 'likes')

  return {
    author: maxLikes.author,
    likes: maxLikes.likes
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}