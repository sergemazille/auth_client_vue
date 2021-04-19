describe('HeaderMenu', () => {
  it('display the header menu while not logged in', () => {
    cy.visit('/');
    cy.userIsAuthenticated(false);

    cy.get('.header-menu').should('contain.text', 'Accueil');
    cy.get('.header-menu').should('contain.text', 'Dashboard');
    cy.get('.header-menu').should('contain.text', 'Register');
  });

  it('display the header menu while logged in', () => {
    cy.visit('/');
    cy.userIsAuthenticated(true);

    cy.get('.header-menu').should('contain.text', 'Logout');
    cy.get('.header-menu').should('contain.text', 'Dashboard');
  });

  it('should visit login page when user clicks on dashboard link while not authenticated', () => {
    cy.visit('/');
    cy.userIsAuthenticated(false);
    cy.get('[data-selector="dashboard-link"]').click();

    cy.url().should('include', '/login');
  });

  it('should visit registration page when user clicks on register link', () => {
    cy.visit('/');
    cy.get('[data-selector="register-link"]').click();

    cy.url().should('include', '/register');
  });

  it('should visit home page when user clicks on home link', () => {
    cy.visit('/login');
    cy.get('[data-selector="home"]').click();

    cy.contains('Accueil').should('be.visible');
  });

  it('should be redirected to home page when user is logged out', () => {
    cy.userIsAuthenticated(true);
    cy.visit('/dashboard');
    cy.get('[data-selector="logout-action"]').click();

    cy.contains('Accueil').should('be.visible');
  });
});
