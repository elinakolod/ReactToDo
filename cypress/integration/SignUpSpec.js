describe('SignUp', () => {
  beforeEach(() => {
    cy.clean()
    cy.visit('/signup')
  })

  it('signups', function () {
    let person = {
      name: 'Joe',
      lastName: 'Ivanov',
      email: 'test@i.ua',
      password: '123456'
    }
    cy.get('#formBasicFirstName').type(person.name).should('have.value', person.name)
    cy.get('#formBasicLastName').type(person.lastName).should('have.value', person.lastName)
    cy.get('#formBasicEmail').type(person.email).should('have.value', person.email)
    cy.get('#formBasicPassword').type(person.password).should('have.value', person.password)
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.exist
    })
    cy.wait(1000)
    cy.url().should('include', '/projects')
    cy.get('h2').should('contain', person.name)
  })

  it('shows errors', function () {
    let errors = ["First name can't be blank",
                  "Last name can't be blank",
                  "Email can't be blank",
                  "Password can't be blank"]
    cy.visit('/signup')
    cy.get('.btn').click().should(() => {
      expect(localStorage.getItem('token')).to.be.null
    })
    cy.wait(1000)
    cy.url().should('include', '/signup')
    errors.forEach(message => cy.get('.error').should('contain', message))
  })
})
