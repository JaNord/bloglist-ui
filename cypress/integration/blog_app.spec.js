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

    it('fills with incorrect credentials', function() {
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

    describe('when blog list is populated', function() {

      beforeEach(function() {
        cy.createBlog({
          title: 'Blog created by Cypress',
          author: 'Cypress',
          url: 'https://www.cypress.io'
        })

        cy.createBlog({
          title: 'Second blog created by Cypress',
          author: 'Cypress',
          url: 'https://www.cypress.io'
        })
      })

      it('a blog can be liked', function() {
        cy
          .contains('Blog created by Cypress')
          .parent()
          .find('button')
          .click()

        cy.get('.likeButton').click()

        cy.get('.likes').contains(1)
      })

      it('a blog can be deleted by the user who created it', function() {
        cy
          .contains('Blog created by Cypress')
          .parent()
          .find('button')
          .click()

        cy.contains('delete').click()
        cy.contains('Blog created by Cypress deleted')

        cy.contains('Blog created by Cypress').should('not.exist')
      })
    })
  })
})