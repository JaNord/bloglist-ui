import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { addUser } from '../reducers/userReducer'
import {  setNotificationWithTimeout } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault()

    const user = { username, password }
    try {
      const authenticatedUser = await loginService.authenticate(user)

      window
        .localStorage
        .setItem('loggedUser', JSON.stringify(authenticatedUser))

      dispatch(addUser(authenticatedUser))
      blogService.setToken(authenticatedUser.token)
    }

    catch(exception) {
      dispatch(setNotificationWithTimeout('incorrect username or password'))
    }
  }

  return (
    <form onSubmit={ login }>
      <div>
              username:
        <input
          id='username'
          type='text'
          value={ username }
          name='Username'
          onChange={ ({ target }) => setUsername(target.value)}>
        </input>
      </div>
      <div>
              password:
        <input
          id='password'
          type='password'
          value={ password }
          name='Password'
          onChange={ ({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button id='loginButton' type='submit'>login</button>
    </form>
  )}

export default Login