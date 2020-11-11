import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'

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

  const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    try {
      dispatch(getAllBlogs())
    }
    catch(exception) {
      console.log(exception)
    }
  }, [])

  useEffect(() => {
    try {
      dispatch(initAllUsers())
    }
    catch(exception) {
      console.log(exception)
    }
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)

      dispatch(addUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }}, [])

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    :null

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null



  return (
    <Container>
      <Navbar />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/newBlog'>
          <BlogForm />
        </Route>
        <Route path='/users/:id'>
          <UserInfo user={ user } />
        </Route>
        <Route path='/blogs/:id'>
          <BlogInfo blog={ blog } />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>
    </Container>
  )
}

export default App