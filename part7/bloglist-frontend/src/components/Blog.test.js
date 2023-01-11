import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const likeMockHandler = jest.fn()
const setNotificationMock = jest.fn()
const removeFromListMock = jest.fn()

const data = {
  testblog: {
    id: '1234567',
    title: 'test',
    author: 'tester',
    url: 'www.test.fi',
    likes: 10,
    user: {
      id: '31313131',
      username: 'testailija',
      name: 'teppo testi'
    },
  },
  user: {
    id: '31313131',
    username: 'testailija',
    name: 'teppo testi'
  },
  updateLikes: likeMockHandler,
}

describe('Blog tests', () => {
  test('renders title and author, but not the URL or likes', () => {
    render(<Blog blog={data.testblog} user={data.user} updateLikes={data.updateLikes} setNotification={setNotificationMock} removeFromList={removeFromListMock}/>)

    const blogElement = screen.getByText('test tester')
    expect(blogElement).toBeDefined

    const urlElement = screen.queryByText('www.test.fi')
    const likesElement = screen.queryByText('likes 10')

    expect(urlElement).toBeNull
    expect(likesElement).toBeNull
  })

  test('renders url and likes after view is clicked', async() => {
    render(<Blog blog={data.testblog} user={data.user} updateLikes={data.updateLikes} setNotification={setNotificationMock} removeFromList={removeFromListMock}/>)
    const user = userEvent.setup()

    expect('likes 10').not.toBeInTheDocument
    expect('www.test.fi').not.toBeInTheDocument

    const button = screen.getByText('view')
    await user.click(button)

    expect('likes 10').toBeInTheDocument
    expect('www.test.fi').toBeInTheDocument

  })

  test('clicking like twice calls event handler twice', async() => {

    render(<Blog blog={data.testblog} user={data.user} updateLikes={data.updateLikes}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likebutton = screen.getByText('like')
    await user.click(likebutton)
    expect(likeMockHandler.mock.calls).toHaveLength(1)
    await user.click(likebutton)
    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })

})
