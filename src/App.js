import React, { useState, useEffect, useRef } from 'react'

import BlogView from './components/BlogView'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
      const loggedUser = JSON.parse(loggedUserJSON)

      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }}, [])

  const showNotification = (message, duration) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, duration)
  }

  const login = async (user) => {
    try {
      const authenticatedUser = await loginService.authenticate(user)

      window
        .localStorage
        .setItem('loggedUser', JSON.stringify(authenticatedUser))

      setUser(authenticatedUser)
      blogService.setToken(authenticatedUser.token)
    }

    catch(exception) {
      showNotification('wrong username or password', 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
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

        showNotification(`${ deletedBlog.title} deleted.`, 2000)
      }
      catch(exception) {
        showNotification('Blog deletion failed', 2000)
      }
    }
  }

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      console.log(createdBlog)
      setBlogs(blogs.concat(createdBlog))

      showNotification(`${ createdBlog.title} created.`, 2000)
    }

    catch(exception) {
      showNotification('Blog creation failed', 2000)
    }
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={ notification }/>
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