import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {

  let component
  const blog = {
    title: 'react testing',
    author: 'Ja Nord'
  }

  beforeEach(() => {
    component = render(
      <Blog  blog={ blog }/>
    )
  })


  test('renders content', () => {
    expect(component.container).toBeDefined()
  })

  test('renders blog title', () => {
    const titleDiv = component.container.querySelector('.title')

    expect(titleDiv).toBeDefined()
    expect(titleDiv).toHaveTextContent(blog.title)
  })

  test('renders blog author', () => {
    const titleDiv = component.container.querySelector('.author')

    expect(titleDiv).toBeDefined()
    expect(titleDiv).toHaveTextContent(blog.author)
  })
})