describe('LogIn', () => {
  beforeEach( () =>  {
    cy.clean()
    cy.fixture('user.json').as('userJson')
  })

  it('logins', function () {
    cy.request('POST', 'http://localhost:3000/api/v1/signups', this.userJson)
    cy.visit('/signin')
    cy.get('#formBasicEmail').type(this.userJson.email).should('have.value', this.userJson.email)
    cy.get('#formBasicPassword').type(this.userJson.password).should('have.value', this.userJson.password)
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.exist
    })
    cy.url().should('include', '/projects')
    cy.get('h2').should('contain', this.userJson.first_name)
  })

  it('does not login unregistered user', function () {
    cy.request('POST', 'http://localhost:3000/api/v1/signups', this.userJson)
    let unregEmail = 'new_email@i.ua'
    cy.visit('/signin')
    cy.get('#formBasicEmail').type(unregEmail).should('have.value', unregEmail)
    cy.get('#formBasicPassword').type(this.userJson.password).should('have.value', this.userJson.password)

  })

  it('shows errors', function () {
    cy.visit('/signin')
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.be.null
    })
    cy.url().should('include', '/signin')
  })
})
