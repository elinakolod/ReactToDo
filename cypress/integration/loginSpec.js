import Factory from '../utils/Factory';

describe('Client on the Home page', () => {
  before(() => {
    cy.clean();
    cy.loadSeed();
    cy.factories(
      Factory.create('setting', 'with_homepage').value,
    );
  });

  it('views the Loading screen', () => {
    cy.visit('/');
  });
});
