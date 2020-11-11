import React from 'react'
import { useSelector } from 'react-redux'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core'

const UserInfo = ({ user }) => {

  if(!user) {
    return null
  }


  const usersBlogs = useSelector(state =>
    state.blogs.filter(blog => blog.user.id === user.id))

  return (
    <div>
      <h2>{ user.name }</h2>
      { usersBlogs.length > 0
        ? <>
          <h3>Posted blogs</h3>
          <TableContainer component={ Paper }>
            <Table>
              <TableBody>
                { usersBlogs.map(blog => (
                  <TableRow key={ blog.id }>
                    <TableCell>
                      { blog.title }
                    </TableCell>
                    <TableCell>
                      { blog.author }
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
        </>
        : <h3>No posted blogs</h3>
      }
    </div>
  )
}
export default UserInfo