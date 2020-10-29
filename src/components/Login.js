import React, { useState } from 'react'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    login({
      username,
      password
    })
  }

  return (
    <form onSubmit={ handleLogin }>
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