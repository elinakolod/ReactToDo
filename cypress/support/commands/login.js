Cypress.Commands.add('login', function (user) {
  cy.request('POST', 'http://localhost:3000/api/v1/signins', user)
      .its('body')
      .then((body) => {
        localStorage.setItem('token', body.csrf)
      })
})
