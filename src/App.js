import React, { useState, useEffect, useRef } from 'react'

import BlogView from './components/BlogView'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    try{
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
    catch(exception) {
      console.log('could not fetch blogs')
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }}, [])

  const login = async (user) => {
    try {
      const authenticatedUser = await loginService.authenticate(user)

      window
        .localStorage
        .setItem('loggedUser', JSON.stringify(authenticatedUser))

      setUser(authenticatedUser)
    }

    catch(exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    const returnedBlog = await blogService.updateBlog(updatedBlog)
    setBlogs(
      blogs.map(blog => blog.id !== returnedBlog.id
        ? blog
        : returnedBlog)
    )
  }

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(createdBlog))
    }

    catch(exception) {
      console.log('blog creation failed')
    }
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Blogs</h2>

      {user !== null
        ? <BlogView
          blogs={ blogs }
          username={ user.name }
          blogFormRef={ blogFormRef }
          handleLogout={ handleLogout }
          createBlog={ createBlog }
          handleLike={ likeBlog }/>

        : <Login login={ login }/>}
    </div>
  )
}

export default App