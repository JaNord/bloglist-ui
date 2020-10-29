import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import UserInfo from './UserInfo'

const BlogView = ({
  username,
  blogs,
  blogFormRef,
  handleLogout,
  createBlog }) => {
    
  return (
  <>
    <UserInfo username={ username } handleLogout={ handleLogout }/>

    {blogs.map(blog =>
       <Blog key={blog.id} blog={blog} />
      )}

    <Togglable buttonLabel='add blog' ref={ blogFormRef }>
      <BlogForm createBlog={ createBlog }/>
    </Togglable>
  </>
)}
export default BlogView