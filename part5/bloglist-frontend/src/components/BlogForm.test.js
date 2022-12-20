import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'


const userdata =  {
  id: '31313131',
  username: 'testailija',
  name: 'teppo testi'
}

describe('Blog form', () => {


  test('Form calls event handler with right details', async() => {
    const createBlogMock = jest.fn()
    const setNotificationMock = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlogMock} user={userdata} setNotification={setNotificationMock} />)

    const titleinput = screen.getByPlaceholderText('write title here')
    const authorinput = screen.getByPlaceholderText('write author here')
    const urlinput = screen.getByPlaceholderText('write url here')
    const sendButton = screen.getByText('create')

    await user.type(titleinput, 'Test Title')
    await user.type(authorinput, 'Testailija')
    await user.type(urlinput, 'www.testi.fi')
    await user.click(sendButton)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlogMock.mock.calls[0][0].author).toBe('Testailija')
    expect(createBlogMock.mock.calls[0][0].url).toBe('www.testi.fi')
  })
})
