import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography
} from '@material-ui/core'
import { removeUser } from '../reducers/userReducer'

const Navbar = ({ user, history, dispatch }) => {

  const logOut = () => {
    dispatch(removeUser())
    window.localStorage.clear()
    history.push('/')
  }

  return (
    <AppBar position="static">
      <Toolbar >
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography type="title" color="inherit" style={{ flex: 1 }}>
          Bloglist
        </Typography>
        <Button color="inherit" component={ Link } to='/'>
          home
        </Button>
        <Button color="inherit" component={ Link } to='/users'>
          users
        </Button>
        {user
          ? <div>
            <Button color="inherit" component={ Link } to='/newBlog'>
              add blog
            </Button>

            <em>{ user.name } logged in</em>

            <Button color='inherit' onClick={ logOut }>Log out</Button>
          </div>
          :
          <Button color="inherit" component={ Link } to="/login">
              login
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar