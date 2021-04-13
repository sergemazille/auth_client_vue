describe('Dashboard', () => {
  it('visit the dashboard page', () => {
    cy.userIsAuthenticated(true);
    cy.visit('/dashboard');

    cy.contains('Dashboard');
  });
});
