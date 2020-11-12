import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Login from './components/Login'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import BlogInfo from './components/BlogInfo'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { initAllUsers } from './reducers/allUsersReducer'

const App = () => {

  const users = useSelector(state => state.allUsers)
  const currentUser = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    try {
      dispatch(getAllBlogs())
    }
    catch(exception) {
      setNotification('Could not get blogs', true)
    }
  }, [])

  useEffect(() => {
    try {
      dispatch(initAllUsers())
    }
    catch(exception) {
      setNotification('Could not get users')
    }
  },[])

  const setNotification = (message, isError = false) => {
    if (isError) {
      return toast.error(message)
    }

    return toast.info(message)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)

      dispatch(addUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }}, [])

  const blogsByUser = (user) => {
    if (user) {
      return blogs.filter(blog => blog.user.id === user.id)
    }}

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    :null

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  return (
    <Container>
      <Navbar
        user={ currentUser }
        dispatch={ dispatch }
        history={ history }
      />
      <Switch>
        <Route path='/login'>
          <Login
            blogService={ blogService }
            dispatch={ dispatch }
            history={ history }
            setNotification={ setNotification }/>
        </Route>

        <Route path='/newBlog'>
          <BlogForm
            dispatch={ dispatch }
            history={ history }
            setNotification={ setNotification }/>
        </Route>

        <Route path='/users/:id'>
          <UserInfo
            user={ matchedUser }
            userBlogs={ blogsByUser(matchedUser) }/>
        </Route>

        <Route path='/blogs/:id'>
          <BlogInfo
            blog={ matchedBlog }
            user={ currentUser }
            dispatch={ dispatch }
            history={ history }
            setNotification= { setNotification }/>
        </Route>

        <Route path='/users'>
          <UserList
            blogs={ blogs }
            users={ users }/>
        </Route>

        <Route path='/'>
          <BlogList
            blogs={ blogs } />
        </Route>
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  )
}

export default App