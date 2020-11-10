import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const BlogForm = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const createBlog = async (event) => {
    event.preventDefault()

    dispatch(addBlog({ title, author, url }))
    dispatch(setNotificationWithTimeout(`${ title } created.`))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={ createBlog }>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={ title }
            onChange={ ({ target }) => setTitle(target.value) }>
          </input>
        </div>

        <div>
          author:
          <input
            id='author'
            type="text"
            value={ author }
            onChange={ ({ target }) => setAuthor(target.value) }>
          </input>
        </div>

        <div>
          url:
          <input
            id='url'
            type="text"
            value={ url }
            onChange={ ({ target }) => setUrl(target.value) }>
          </input>
        </div>

        <button
          type='submit'
          id='submitBlogForm'>
            create
        </button>
      </form>
    </>
  )
}

export default BlogForm