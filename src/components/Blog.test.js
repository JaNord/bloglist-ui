import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {

  let component
  const mockHandleLike = jest.fn()
  const blog = {
    title: 'react testing',
    author: 'Ja Nord'
  }

  beforeEach(() => {
    component = render(
      <Blog  blog={ blog } handleLike={ mockHandleLike }/>
    )
  })


  test('renders content', () => {
    expect(component.container).toBeDefined()
  })

  test('renders blog title and author', () => {
    const titleDiv = component.container.querySelector('.basicInfo')

    expect(titleDiv).toBeDefined()
    expect(titleDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('does not render url or likes by default', () => {
    const urlDiv = component.container.querySelector('.url')
    const likesDiv = component.container.querySelector('.likes')

    expect(urlDiv).toBeFalsy()
    expect(likesDiv).toBeFalsy()
  })

  test('shows url and likes when show all button is pressed', () => {
    const showButton = component.container.querySelector('.showAll')
    fireEvent.click(showButton)

    const urlDiv = component.container.querySelector('.url')
    const likesDiv = component.container.querySelector('.likes')

    expect(urlDiv).toBeTruthy()
    expect(likesDiv).toBeTruthy()
  })

  test('like event handler is called twice when button is pressed twice', () => {
    const showButton = component.container.querySelector('.showAll')
    fireEvent.click(showButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)


  })
})