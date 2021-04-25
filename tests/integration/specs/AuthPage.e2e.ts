describe('AuthPage', () => {
  it('should display an error notification when login attempt fails', () => {
    cy.visit('/login');

    cy.intercept('POST', '**/api/v1/login', {
      statusCode: 400, // success
    }).as('loginRequest');

    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password{enter}');

    cy.get('.notification').should('be.visible');
  });
});
