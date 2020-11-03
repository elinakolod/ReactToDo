const NAME = 'Project 1'
const USER = {
  email: 'test@i.ua',
  password: '123456'
}

describe('Projects', () => {
  before( () =>  {
    cy.clean()
    cy.signUp()
  })

  it('creates project', function () {
    cy.visit('/projects')
    cy.get('input[name="name"]').type(NAME).should('have.value', NAME)
    cy.get('#project-form').within(() => {
      cy.get('.btn').click()
    })
    cy.get('input[name="name"]').should('have.value', '')
    cy.get('h3').should('contain', NAME)
    cy.contains('Edit').should('be.visible')
    cy.contains('Remove').should('be.visible')
    cy.contains('Add Task').should('be.visible')
    //cy.get('.error').should('be.empty')
  })

  context('manage project', function () {
    beforeEach( () =>  {
      cy.login(USER)
      cy.visit('/projects')
    })

    it('edits project', function () {
      let newName = 'newName'
      cy.contains('Edit').click()
      cy.get('#projectNameInput1').clear().type(newName).type('{enter}')
      cy.contains(NAME).should('not.exist')
      cy.get('h3').should('contain', newName)
    })

    it('deletes project', function () {
      cy.get('.btn-outline-danger').click()
      cy.contains(NAME).should('not.exist')
      cy.contains('Edit').should('not.exist')
      cy.contains('Remove').should('not.exist')
      cy.contains('Add Task').should('not.exist')
    })
  })
})
