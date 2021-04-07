describe('HeaderMenu', () => {
  it('display the header menu while not logged in', () => {
    cy.visit('/');

    cy.get('.header-menu').should('contain.text', 'Accueil');
    cy.get('.header-menu').should('contain.text', 'Login');
    cy.get('.header-menu').should('contain.text', 'Register');
  });
});
