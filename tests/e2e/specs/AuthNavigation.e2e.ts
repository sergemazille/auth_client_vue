describe('AuthNavigation', () => {
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
