describe('UserAuthForm', () => {
  it('visit the home page', () => {
    cy.visit('/');
    cy.contains('Accueil');
  });
});
