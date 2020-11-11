import React, { useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'

import Login from './components/Login'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import { getAllBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { initAllUsers } from './reducers/allUsersReducer'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'

const App = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.allUsers)
  // const blogs = useSelector(state => state.blogs)

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

  const userMatch = useRouteMatch('/users/:id')

  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  console.log(user)

  return (
    <Container>
      <Navbar />
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/users/:id'>
          <UserInfo user={ user } />
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