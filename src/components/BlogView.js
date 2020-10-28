import React from 'react'
import Blog from './Blog'
import UserInfo from './UserInfo'

const BlogView = ({
  username,
  blogs,
  handleLogout,
  blogTitle,
  blogAuthor,
  blogUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  createBlog }) => (
    <>
    <UserInfo username={ username } handleLogout={ handleLogout }/>

    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    <h2>create new</h2>
      <form onSubmit={ createBlog }>
        <div>
          title:
          <input
            type="text"
            value={ blogTitle }
            onChange={ ({target}) => handleTitleChange(target.value) }>
          </input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={ blogAuthor }
            onChange={ ({target}) => handleAuthorChange(target.value) }>
          </input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={ blogUrl }
            onChange={ ({target}) => handleUrlChange(target.value) }>
          </input>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
)
export default BlogView