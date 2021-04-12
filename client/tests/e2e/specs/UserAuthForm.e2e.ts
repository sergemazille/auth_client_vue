describe('UserAuthForm', () => {
  it('submit button is disabled as a default state', () => {
    cy.visit('/login');

    cy.get('button').should('have.attr', 'disabled', 'disabled');
  });

  it('submit button is enabled when inputs are valid', () => {
    cy.visit('/login');

    cy.get('input[type="email"]').type('user@email.com');
    cy.get('input[type="password"]').type('password');

    cy.get('button').should('not.have.attr', 'disabled');
  });

  it('submit button is disabled if email is not a valid email', () => {
    cy.visit('/login');

    cy.get('input[type="email"]').type('not a valid email');
    cy.get('input[type="password"]').type('password');

    cy.get('button').should('have.attr', 'disabled', 'disabled');
  });

  it('submit button is disabled if password has less than 4 characters', () => {
    cy.visit('/login');

    cy.get('input[type="email"]').type('user@email.com');
    cy.get('input[type="password"]').type('abc');

    cy.get('button').should('have.attr', 'disabled', 'disabled');
  });
});
