import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async(newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async(updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comment`, { comment })

  return response.data
}

const deleteBlog = async(blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`)
}

export default {
  setToken,
  getAll,
  createBlog,
  updateBlog,
  addComment,
  deleteBlog
}