describe('Page 404', () => {
  it('should display 404 error page if the route does not exist', () => {
    cy.visit('/these-are-not-the-droids-you-are-looking-for');

    cy.contains('404').should('be.visible');
  });
});
