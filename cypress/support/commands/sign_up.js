Cypress.Commands.add('signUp', function () {
  let user = {
    "first_name": "Ivan",
    "last_name": "Ivanov",
    "email": "test@i.ua",
    "password": "123456"
  }
  cy.request('POST', 'http://localhost:3000/api/v1/signups', user)
      .its('body')
      .as('currentUser')
      .then((body) => {
        localStorage.setItem('token', body.csrf)
      })
})
