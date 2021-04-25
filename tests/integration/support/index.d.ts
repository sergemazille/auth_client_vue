declare namespace Cypress {
  interface Chainable {
    userIsAuthenticated(isAuthenticated: boolean): Chainable<Element>;
  }
}
