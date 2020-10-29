import React from 'react'

import PropTypes from 'prop-types'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import UserInfo from './UserInfo'

const BlogView = ({
  username,
  blogs,
  blogFormRef,
  handleLogout,
  createBlog,
  handleLike,
  handleDelete }) => {

  return (
    <>
      <UserInfo username={ username } handleLogout={ handleLogout }/>

      <ul>
        {blogs
          .sort((blog1,blog2) => blog2.likes - blog1.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              username= { username }
              handleLike={ handleLike }
              handleDelete={ handleDelete }/>
          )}
      </ul>

      <Togglable buttonLabel='add blog' ref={ blogFormRef }>
        <BlogForm createBlog={ createBlog }/>
      </Togglable>
    </>
  )}

BlogView.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default BlogView