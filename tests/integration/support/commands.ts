Cypress.Commands.add('userIsAuthenticated', doAuthenticated => {
  cy.visit('/');

  cy.window()
    .its('store')
    .then(store => {
      // in memory store
      store.state.auth.isAuthenticated = doAuthenticated;

      // local store
      if (doAuthenticated) {
        localStorage.setItem('isAuthenticated', JSON.stringify(doAuthenticated));
      } else {
        localStorage.removeItem('isAuthenticated');
      }
    });

  cy.wait(0);
});
