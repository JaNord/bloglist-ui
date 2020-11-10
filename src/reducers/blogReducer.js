import blogService from '../services/blogs'

//action types
const GET_ALL_BLOGS = 'GET_ALL_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const UPDATE_BLOG = 'UPDATE_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'

const reducer = (state=[], action) => {

  switch(action.type) {
  case GET_ALL_BLOGS:
    return action.data

  case ADD_BLOG:
    return [...state, action.data]

  case UPDATE_BLOG:
    return state.map(blog =>
      blog.id !== action.data.id
        ? blog
        : action.data
    )

  case DELETE_BLOG:
    return state.filter(blog =>
      blog.id !== action.data.id)

  default:
    return state
  }
}

// action creators
export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: GET_ALL_BLOGS,
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog)

    dispatch({
      type: ADD_BLOG,
      data: newBlog
    })
  }
}

export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.updateBlog(updatedBlog)

    dispatch({
      type: UPDATE_BLOG,
      data: returnedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)

    dispatch({
      type: DELETE_BLOG,
      data: blog
    })
  }
}


export default reducer
