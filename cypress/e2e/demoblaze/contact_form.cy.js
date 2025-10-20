/// <reference types="cypress" />

describe('DemoBlaze: Contact form modal', () => {
  it('opens the Contact modal, sends message, verifies alert', () => {
    cy.visit('/index.html');

    // Open modal from navbar
    cy.contains('a', /^Contact$/i).click();

    // Modal appears (Bootstrap id is #exampleModal)
    cy.get('#exampleModal').should('be.visible');

    // Fill fields
    cy.get('#recipient-email').clear().type('qa@example.com');
    cy.get('#recipient-name').clear().type('QA User');
    cy.get('#message-text').clear().type('This is a test message from Cypress.');

    // Stub and assert browser alert text (message may vary slightly)
    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.contains('#exampleModal button', /^Send message$/i).click();

    cy.get('@alert')
      .should('have.been.called')
      .its('firstCall.args.0')
      .should('match', /thanks|message/i);

    // Modal should close after sending
    cy.get('#exampleModal').should('not.be.visible');
  });
});


// npx cypress open    # then pick: contact_form.cy.js