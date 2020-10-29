import axios from 'axios'
const baseURL = '/api/login'

const authenticate = async credentials => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

export default { authenticate }