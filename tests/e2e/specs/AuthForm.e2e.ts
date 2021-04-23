describe('AuthForm', () => {
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

  it("should redirect to a secured page if api call's response is OK", () => {
    cy.visit('/login?redirect=/dashboard');

    cy.intercept('POST', '**/api/v1/login', {
      statusCode: 200, // success
    }).as('loginRequest');

    cy.get('input[type="email"]').type('user@email.com');
    cy.get('input[type="password"]').type('abcd{enter}');
    cy.wait('@loginRequest');

    cy.contains('Accès autorisé uniquement à un utilisateur authentifié').should('be.visible');
  });

  it("should not redirect to a secured page if api call's response is not OK", () => {
    cy.visit('/login?redirect=/dashboard');

    cy.intercept('POST', '**/api/v1/login', {
      statusCode: 401, // failure
    }).as('loginRequest');

    cy.get('input[type="email"]').type('user@email.com');
    cy.get('input[type="password"]').type('abcd{enter}');
    cy.wait('@loginRequest');

    cy.contains('Accès autorisé uniquement à un utilisateur authentifié').should('not.exist');
  });
});
