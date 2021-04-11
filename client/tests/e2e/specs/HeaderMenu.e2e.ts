describe('HeaderMenu', () => {
  it('display the header menu while not logged in', () => {
    cy.visit('/');
    cy.userIsAuthenticated(false);

    cy.get('.header-menu').should('contain.text', 'Accueil');
    cy.get('.header-menu').should('contain.text', 'Login');
    cy.get('.header-menu').should('contain.text', 'Register');
  });

  it('display the header menu while logged in', () => {
    cy.visit('/');
    cy.userIsAuthenticated(true);

    cy.get('.header-menu').should('contain.text', 'Logout');
    cy.get('.header-menu').should('not.contain.text', 'Login');
  });
});
