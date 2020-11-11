import { Box, Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'

import { updateBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blog }) => {

  const dispatch = useDispatch()

  const like = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(updatedBlog))
  }

  return (
    <div>
      <Box component='h2' display='block'>{ blog.title }</Box>
      <Box component='a' href={ blog.url } display='block'>{ blog.url }</Box>
      <Box component='span' display='block'>By { blog.author }</Box>

      <Box component='div' display='block'>likes: { blog.likes }</Box>
      <Button
        variant="contained"
        color="primary"
        onClick={ like }>
          Like
      </Button>

    </div>
  )
}

export default BlogInfo