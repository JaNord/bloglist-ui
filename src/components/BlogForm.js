import React, { useState } from 'react'

import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { addBlog } from '../reducers/blogReducer'

const BlogForm = ({ history, dispatch, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    dispatch(addBlog({ title, author, url }))
    history.push('/')
    setNotification(`${ title } was added.`)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
        width: 750,
      },
    },
  }))

  const classes = useStyles()

  return (
    <div>
      <h2>Add new blog</h2>

      <form className={ classes.root } onSubmit={ createBlog }>
        <div>
          <TextField
            fullWidth
            variant='outlined'
            label='title'
            value={ title }
            onChange={ ({ target }) => setTitle(target.value)}>
          </TextField>
        </div>

        <div>
          <TextField
            fullWidth
            variant='outlined'
            label='author'
            value={ author }
            onChange={ ({ target }) => setAuthor(target.value)}>
          </TextField>
        </div>

        <div>
          <TextField
            fullWidth
            variant='outlined'
            label='url'
            value={ url }
            onChange={ ({ target }) => setUrl(target.value)}>
          </TextField>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit">
            Add blog
          </Button>
        </div>
      </form>
    </div>
  )
}
export default BlogForm