describe('SignUp', () => {
  beforeEach(() => {
    cy.clean()
    cy.fixture('user.json').as('userJson')
    cy.visit('/signup')
  })

  it('signups', function () {
    cy.get('#formBasicFirstName').type(this.userJson.first_name).should('have.value', this.userJson.first_name)
    cy.get('#formBasicLastName').type(this.userJson.last_name).should('have.value', this.userJson.last_name)
    cy.get('#formBasicEmail').type(this.userJson.email).should('have.value', this.userJson.email)
    cy.get('#formBasicPassword').type(this.userJson.password).should('have.value', this.userJson.password)
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.exist
    })
    cy.url().should('include', '/projects')
    cy.get('h2').should('contain', this.userJson.first_name)
  })

  it('shows blank errors', function () {
    let errors = ["First name can't be blank",
                  "Last name can't be blank",
                  "Email can't be blank",
                  "Password can't be blank"]
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.be.null
    })
    cy.url().should('include', '/signup')
    errors.forEach(message => cy.get('.error').should('contain', message))
  })

  it('check for already existing user', function () {
    cy.signUp()
    cy.clearLocalStorage()
    cy.get('#formBasicEmail').type('test@i.ua')
    let error = 'Email has already been taken'
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.be.null
    })
    cy.url().should('include', '/signup')
    cy.get('.error').should('contain', error)
  })
})
