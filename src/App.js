import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogView from './components/BlogView'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'

const App = () => {

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    try {
      dispatch(getAllBlogs())
    }
    catch(exception) {
      console.log(exception)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)

      dispatch(addUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }}, [])

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={ notification }/>
      {user
        ? <BlogView
          blogFormRef={ blogFormRef }/>

        : <Login />}
    </div>
  )
}

export default App