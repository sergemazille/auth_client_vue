describe('Dashboard', () => {
  it('visit the dashboard page', () => {
    cy.visit('/dashboard');

    cy.contains('Dashboard');
  });
});
