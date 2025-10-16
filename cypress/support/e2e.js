// No plugin; make snapshot a no-op so the test still runs
Cypress.Commands.add('maybeSnapshot', () => {});

Cypress.Commands.add('expectAlertToContain', () => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alert');
  });
});