Cypress.Commands.add('clearBrowserData', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
Cypress.Commands.add('alert', (phrase) => {
  cy.get('[data-cy=alert]').should('contain', phrase);
});
Cypress.Commands.add('closeAlert', () => {
  cy.get('[data-cy=alert]').find('button.main-alert__close').click();
});
