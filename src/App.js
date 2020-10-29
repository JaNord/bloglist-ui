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
      // using async/await in useEffect method is wonky
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

  const deleteBlog = async (deletedBlog) => {

    console.log(user.username)
    console.log(deletedBlog.user.username)

    if(window.confirm(`Delete ${deletedBlog.title} ?`)){
      try {
        await blogService.deleteBlog(deletedBlog)
        setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id ))
      }
      catch(exception) {
        console.log('blog deletion failed')

      }
    }
  }

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      console.log(createdBlog)
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
          username={ user.username }
          blogFormRef={ blogFormRef }
          handleLogout={ handleLogout }
          createBlog={ createBlog }
          handleLike={ likeBlog }
          handleDelete={ deleteBlog }/>

        : <Login login={ login }/>}
    </div>
  )
}

export default App