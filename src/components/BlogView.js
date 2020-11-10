import React from 'react'

import { useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import UserInfo from './UserInfo'

const BlogView = ({ blogFormRef }) => {

  const blogs = useSelector(state =>
    state.blogs
      .sort((blog1,blog2) => blog2.likes - blog1.likes))

  return (
    <>
      <UserInfo />

      <ul className='blogList'>
        {blogs
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}/>
          )}
      </ul>

      <Togglable buttonLabel='add blog' ref={ blogFormRef }>
        <BlogForm />
      </Togglable>
    </>
  )}

export default BlogView