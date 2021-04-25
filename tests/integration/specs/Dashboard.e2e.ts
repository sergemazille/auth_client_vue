describe('Dashboard', () => {
  it('visit the dashboard page while authenticated', () => {
    cy.userIsAuthenticated(true);
    cy.visit('/dashboard');

    cy.contains('Dashboard');
  });

  it('should be redirected to login page if not authenticated', () => {
    cy.userIsAuthenticated(false);
    cy.visit('/dashboard');

    cy.url().should('include', '/login');
  });

  it('should be redirected to dashboard page after authentication', () => {
    cy.userIsAuthenticated(false);
    cy.visit('/dashboard');

    cy.intercept('POST', '**/api/v1/login', {
      statusCode: 200, // success
    }).as('loginRequest');

    cy.get('input[type="email"]').type('user@email.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button').click();

    cy.contains('Accès autorisé uniquement à un utilisateur authentifié').should('be.visible');
  });
});
