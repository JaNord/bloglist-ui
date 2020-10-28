import React, { useState, useEffect } from 'react'
import BlogView from './components/BlogView'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleNameChange = (name) => {
    setUsername(name)
  }

  const handlePasswordChange = (pwd) => {
    setPassword(pwd)
  }

  const handleTitleChange = (title) => {
    setBlogTitle(title)
  }

  const handleAuthorChange = (author) => {
    setBlogAuthor(author)
  }

  const handleUrlChange = (url) => {
    setBlogUrl(url)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
    const user = await loginService.authenticate({
      username,
      password
    })

    window
      .localStorage
      .setItem('loggedUser', JSON.stringify(user))

    setUser(user)
    }

    catch(exception) {
      console.log('wrong credentials')
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    try {
    const createdBlog = await blogService.createBlog(newBlog)
    setBlogs(blogs.concat(createdBlog))
    }
    catch(exception) {
      console.log('blog creation failed')
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user !== null
      ?<>
        <BlogView
          blogs={ blogs }
          username={ user.name }
          handleLogout={ handleLogout }
          blogTitle={ blogTitle }
          blogAuthor={ blogAuthor }
          blogUrl={ blogUrl }
          handleTitleChange= { handleTitleChange }
          handleAuthorChange={ handleAuthorChange }
          handleUrlChange={ handleUrlChange }
          createBlog={ createBlog }
          />
      </>
      : <Login
          username={ username }
          password={ password }
          handleLogin={ handleLogin }
          handleNameChange={ handleNameChange }
          handlePasswordChange={ handlePasswordChange } />}
    </div>
  )
}

export default App