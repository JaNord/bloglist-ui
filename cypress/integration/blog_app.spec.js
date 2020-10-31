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

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('testPassword123')
      cy.get('#loginButton').click()

      cy.contains('tester logged in')
    })

    it('fils with incorrect credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {

    beforeEach(function() {
      cy.login({
        username: 'tester',
        password: 'testPassword123'
      })
    })

    it('a blog can be created', function() {
      cy.contains('add blog').click()

      cy.get('#title').type('Blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io')

      cy.get('#submitBlogForm').click()

      cy.get('.blogList').contains('Blog created by cypress')
    })
  })
})