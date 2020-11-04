const PROJECT_NAME = 'Project 1'
const TASK_NAME = 'Task 1'
const COMMENT_BODY = 'Comment BODY'
const NEW_TASK_NAME = 'NEW_TASK_NAME'
const NEW_PROJECT_NAME = 'NEW_PROJECT_NAME'
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
    cy.get('input[name="name"]').clear()
    cy.contains('Create Project').click()
    cy.contains('must be filled').should('be.visible')
    cy.get('input[name="name"]').type(PROJECT_NAME).should('have.value', PROJECT_NAME)
    cy.contains('Create Project').click()
    cy.get('input[name="name"]').should('have.value', '')
    cy.get('h3').first().should('contain', PROJECT_NAME)
    cy.contains('Edit').should('be.visible')
    cy.contains('Remove').should('be.visible')
    cy.contains('Add Task').should('be.visible')
    cy.get('input[name="new_task_name"]').should('be.visible')
  })

  context('manage project', function () {
    beforeEach( () =>  {
      cy.login(USER)
      cy.visit('/projects')
    })

    it('edits project', function () {
      cy.contains('Edit').click()
      cy.get('#projectNameInput1').clear().type(NEW_PROJECT_NAME).type('{enter}')
      cy.contains(PROJECT_NAME).should('not.exist')
      cy.get('h3').first().should('contain', NEW_PROJECT_NAME)
    })

    it('creates task', function () {
      cy.get('input[name="new_task_name"]').clear()
      cy.contains('Add Task').click()
      cy.contains('must be filled').should('be.visible')
      cy.get('input[name="new_task_name"]').type(TASK_NAME).should('have.value', TASK_NAME)
      cy.contains('Add Task').click()
      cy.get('input[name="new_task_name"]').should('have.value', '')
      cy.get('h6').first().should('contain', TASK_NAME)
      cy.get('input[type="checkbox"]').should('be.visible')
      cy.get('.close-task').should('be.visible')
      cy.get('.edit-task').should('be.visible')
      cy.get('.error').should('be.empty')
      cy.contains('Add Comment').should('be.visible')
      cy.get('input[name="new_comment_body"]').should('be.visible')
    })

    it('marks task', function () {
      cy.get('input[type="checkbox"]').first().check().should('be.checked')
      cy.get('#taskHeader1').should('have.class', 'done')
      cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked')
      cy.get('#taskHeader1').should('not.have.class', 'done')
    })

    it('edits task', function () {
      cy.get('.edit-task').click()
      cy.get('#taskNameInput1').clear().type(NEW_TASK_NAME).type('{enter}')
      cy.contains(TASK_NAME).should('not.exist')
      cy.get('h6').first().should('contain', NEW_TASK_NAME)
    })

    it('creates comment', function () {
      cy.get('input[name="new_comment_body"]').clear()
      cy.contains('Add Comment').click()
      cy.contains('must be filled').should('be.visible')
      cy.get('input[name="new_comment_body"]').type(COMMENT_BODY).should('have.value', COMMENT_BODY)
      cy.contains('Add Comment').click()
      cy.get('input[name="new_comment_body"]').should('have.value', '')
      cy.contains(COMMENT_BODY).should('be.visible')
      cy.get('.close-comment').should('be.visible')
      cy.get('.error').should('be.empty')
    })

    it('deletes comment', function () {
      cy.get('.close-comment').click()
      cy.get('.close-comment').should('not.be.visible')
      cy.contains(COMMENT_BODY).should('not.exist')
    })

    it('deletes task', function () {
      cy.get('.close-task').click()
      cy.get('.close-task').should('not.be.visible')
      cy.contains('Add Comment').should('not.exist')
      cy.get('input[type="checkbox"]').should('not.be.visible')
      cy.get('.edit-task').should('not.be.visible')
      cy.contains(NEW_TASK_NAME).should('not.exist')
    })

    it('deletes project', function () {
      cy.contains('Remove').click()
      cy.contains(NEW_PROJECT_NAME).should('not.exist')
      cy.contains('Edit').should('not.exist')
      cy.contains('Remove').should('not.exist')
      cy.contains('Add Task').should('not.exist')
    })
  })
})
