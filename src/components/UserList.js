import React from 'react'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core'

const UserList = ({ users, blogs }) => {

  const getAmountBlogsPerUser = (id) => {
    return blogs.filter(blog => blog.user.id === id).length
  }

  return (
    <div>
      <Typography variant="h2" >
        Users
      </Typography>
      <TableContainer component={ Paper }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Name</TableCell>
              <TableCell >Amout of blogs posted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={ user.id }>
                <TableCell >
                  <Link to={`/users/${user.id}`}>
                    { user.name }
                  </Link>
                </TableCell>
                <TableCell >
                  { getAmountBlogsPerUser(user.id) }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList