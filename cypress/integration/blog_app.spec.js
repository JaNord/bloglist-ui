describe('Blog List', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const testUser = {
      username: 'tester',
      name: 'tester',
      password: 'testPassword123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
  })

  // describe('when logged in', function() {
  //   beforeEach(function() {
  //     cy.login({
  //       username: 'tester',
  //       password: 'testPassword123'
  //     })
  //   })

  // })
})