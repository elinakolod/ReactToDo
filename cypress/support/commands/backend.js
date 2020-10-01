Cypress.Commands.add('backend', (name, options) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/__cypress__/command`,
    body: JSON.stringify({ name, options }),
    log: true,
    failOnStatusCode: true,
  });
});
Cypress.Commands.add('clean', () => {
  cy.backend('clean');
});
Cypress.Commands.add('loadSeed', () => {
  cy.backend('load_seed');
});
Cypress.Commands.add('factories', (...options) => {
  cy.backend('factory_bot', options);
});
