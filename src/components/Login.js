import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { addUser } from '../reducers/userReducer'
import {  setNotificationWithTimeout } from '../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

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
      history.push('/')
    }

    catch(exception) {
      dispatch(setNotificationWithTimeout('incorrect username or password'))
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
        width: 300,
      },
    },
  }))

  const classes = useStyles()

  return (
    <form className={ classes.root } onSubmit={ login }>
      <div>
        <TextField
          variant='outlined'
          label='username'
          value={ username }
          onChange={({ target }) => setUsername(target.value)}></TextField>
      </div>
      <div>
        <TextField
          variant='outlined'
          type='password'
          label='password'
          value={ password }
          onChange={({ target }) => setPassword(target.value)}></TextField>
      </div>
      <Button
        type='submit'
        variant="contained"
        color="primary">
          login
      </Button>
    </form>
  )}

export default Login