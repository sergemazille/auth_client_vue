describe('Notification (using login action as trigger)', () => {
  it('should display an error notification when login attempt fails', () => {
    cy.visit('/login');

    cy.intercept('POST', '**/api/v1/login', {
      statusCode: 400, // failure
    });

    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password{enter}');

    cy.get('.notification').should('be.visible');
  });

  it('should remove the error notification after X milliseconds (see configuration)', () => {
    const notificationTimeToLiveInMs = Number(Cypress.env('NOTIFICATION_TTL_IN_MS'));
    cy.visit('/login');

    cy.intercept('POST', '**/api/v1/login', {
      statusCode: 400, // failure
    });

    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password{enter}');

    cy.get('.notification').should('be.visible');

    cy.wait(notificationTimeToLiveInMs);
    cy.get('.notification').should('not.exist');
  });
});
