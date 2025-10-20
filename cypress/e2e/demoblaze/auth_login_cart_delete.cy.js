/// <reference types="cypress" />

/**
 * Flow:
 * 1) Sign up with a unique username (or continue if “user exists”).
 * 2) Log in and verify “Welcome <user>”.
 * 3) Add two products (from different categories).
 * 4) In Cart: verify total equals sum of row prices, delete one item,
 *    verify total updates accordingly, then log out.
 */

const uniqueUser = `cypress_${Date.now()}`;
const password = 'Pass123!';

function assertCartTotalEqualsSum() {
  // cart rows have Price in the 3rd <td>
  cy.get('#tbodyid tr td:nth-child(3)')
    .then(($cells) => {
      const prices = [...$cells].map((el) => parseInt(el.innerText, 10));
      const sum = prices.reduce((a, b) => a + b, 0);
      cy.get('#totalp').should('have.text', String(sum));
    });
}

describe('DemoBlaze: signup, login, add items, delete one, assert totals', () => {
  it('auth + cart totals update after delete', () => {
    cy.visit('/index.html');

    // --- Sign up (unique username) ---
    cy.get('#signin2').click();
    cy.get('#signInModal').should('be.visible').within(() => {
      cy.get('#sign-username').clear().type(uniqueUser);
      cy.get('#sign-password').clear().type(password);
      cy.intercept('POST', '**/signup').as('signup');
      cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
      cy.contains('button', /^Sign up$/i).click();
    });
    cy.wait('@signup').its('response.statusCode').should('be.oneOf', [200, 201]);

    // Alert can be "Sign up successful." or "This user already exist."
    cy.get('@alert').its('firstCall.args.0').then((msg) => {
      expect(msg).to.match(/successful|exist/i);
    });
    cy.contains('#signInModal button', /^Close$/i).click({ force: true });
    cy.get('#signInModal').should('not.be.visible');

    // --- Log in ---
    cy.get('#login2').click();
    cy.get('#logInModal').should('be.visible').within(() => {
      cy.get('#loginusername').clear().type(uniqueUser);
      cy.get('#loginpassword').clear().type(password);
      cy.intercept('POST', '**/login').as('login');
      cy.contains('button', /^Log in$/i).click();
    });
    cy.wait('@login').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.get('#nameofuser').should('be.visible').and('contain.text', `Welcome ${uniqueUser}`);

    // --- Add first product from Phones ---
    cy.intercept('POST', '**/bycat').as('byCategory');
    cy.contains('#itemc', 'Phones').click();
    cy.wait('@byCategory');

    cy.get('#tbodyid').should('be.visible');
    cy.get('#tbodyid .card-title a').first().click(); // open first phone
    cy.intercept('POST', '**/addtocart').as('addToCart1');
    cy.window().then((win) => cy.stub(win, 'alert').as('alertAdd1'));
    cy.contains('a', /^Add to cart$/i).click();
    cy.wait('@addToCart1').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.get('@alertAdd1').its('firstCall.args.0').should('match', /added/i);

    // Back home
    cy.get('#nava').click();

    // --- Add second product from Laptops ---
    cy.contains('#itemc', 'Laptops').click();
    cy.wait('@byCategory');
    cy.get('#tbodyid .card-title a').first().click();
    cy.intercept('POST', '**/addtocart').as('addToCart2');
    cy.window().then((win) => cy.stub(win, 'alert').as('alertAdd2'));
    cy.contains('a', /^Add to cart$/i).click();
    cy.wait('@addToCart2').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.get('@alertAdd2').its('firstCall.args.0').should('match', /added/i);

    // --- Open Cart, verify sum === total ---
    cy.get('#cartur').click();
    cy.url().should('include', 'cart.html');

    // Wait for cart to populate (viewcart call happens behind the scenes)
    cy.get('#tbodyid tr', { timeout: 15000 }).should('have.length.greaterThan', 0);
    assertCartTotalEqualsSum();

    // --- Delete first item and re-assert totals ---
    cy.get('#tbodyid tr').then(($rowsBefore) => {
      const cnt = $rowsBefore.length;
      cy.wrap($rowsBefore.eq(0)).contains('Delete').click();
      cy.get('#tbodyid tr').should('have.length', cnt - 1);
      assertCartTotalEqualsSum();
    });

    // --- Logout ---
    cy.get('#logout2').click();
    cy.get('#login2', { timeout: 10000 }).should('be.visible');   // "Log in" shows
cy.get('#logout2').should('not.be.visible');                  // "Log out" hides
cy.get('#nameofuser').should('not.be.visible');               // Welcome <user> hides
;
  });
});


// npx cypress open               # pick auth_login_cart_delete.cy.js
