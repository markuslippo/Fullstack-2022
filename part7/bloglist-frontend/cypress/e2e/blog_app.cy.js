describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'Testi', name: 'make', password: '1234' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })


  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Testi')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('make logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('Väärät')
      cy.get('#password').type('Tunnukset')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'logged in')
    })

    describe('When logged in', function(){
      beforeEach(function() {
        cy.login({ username: 'Testi', password: '1234' })
      })

      it('A blog can be created', function() {

        cy.contains('new blog').click()
        cy.get('#title').type('Testing Blog for Cypress')
        cy.get('#author').type('Tester')
        cy.get('#url').type('www.cypresstestblog.com')
        cy.get('#create-button').click()
        cy.get('.notification')
          .should('contain', 'a new blog Testing Blog for Cypress by Tester added')
          .and('have.css', 'color', 'rgb(0, 128, 0)')

        cy.contains('Testing Blog for Cypress Tester')
      })

      it('A blog can be liked', function() {
        cy.createBlog({ title: 'Testblog', author: 'Tester', url: 'www.test.com', likes: 0 })
        cy.get('#view-button').click()
        cy.contains('likes 0')
        cy.get('#like-button').click()
        cy.contains('likes 1')

      })

      it('A blog can be deleted', function() {
        cy.createBlog({ title: 'Testblog', author: 'Tester', url: 'www.test.com' })
        cy.contains('Testblog Tester')

        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'Testblog Tester')
      })

      it('Blogs are ranked by likes', function() {
        cy.createBlog({ title: 'Blog with 0 likes', author: 'Tester', url: 'www.test.com' })
        cy.createBlog({ title: 'Blog with 1 like', author: 'Tester', url: 'www.test.com' })

        cy.contains('div', 'Blog with 1 like')
          .within(() => {
            cy.get('#view-button').click()
          })
        cy.get('#like-button').click()
        cy.contains('div', 'Blog with 1 like')
          .within(() => {
            cy.get('#view-button').click()
          })

        cy.get('ul div:first').should('contain', 'Blog with 1 like')
        cy.get('ul div:last').should('contain', 'Blog with 0 likes')
      })
    })
  })









})