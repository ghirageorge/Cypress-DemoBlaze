/// <reference types="cypress" />

describe('DemoBlaze: add to cart and purchase', () => {
  beforeEach(() => {
    cy.visit('/index.html');
  });

  it('navigates categories, adds a laptop, and completes order', () => {
    cy.intercept({ method: 'POST', url: '**/bycat' }).as('byCategory');

    cy.contains('#itemc', 'Laptops').click();
    cy.wait('@byCategory').its('response.statusCode').should('be.oneOf', [200, 201]);

    cy.get('#tbodyid').should('be.visible');
    cy.contains('a.hrefch', /sony vaio|dell|macbook/i).first().click();

    cy.intercept({ method: 'POST', url: '**/addtocart' }).as('addToCart');

    cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
    cy.contains('a', /^Add to cart$/i).click();

    cy.wait('@addToCart').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.get('@alert').should('have.been.called');
    cy.get('@alert').its('firstCall.args.0').should('match', /added/i);

    cy.get('#cartur').click();
    cy.url().should('include', 'cart.html');
    cy.get('#tbodyid tr').should('have.length.greaterThan', 0);

    cy.contains('button', /place order/i).click();
    cy.get('#orderModal').should('be.visible');

    const s = { name:'Jane Demo', country:'Romania', city:'Brasov', card:'4242424242424242', month:'10', year:'2028' };
    cy.get('#name').clear().type(s.name);
    cy.get('#country').clear().type(s.country);
    cy.get('#city').clear().type(s.city);
    cy.get('#card').clear().type(s.card);
    cy.get('#month').clear().type(s.month);
    cy.get('#year').clear().type(s.year);

    cy.contains('button', /^Purchase$/i).click();
    cy.contains(/thank you for your purchase/i).should('be.visible');

    cy.get('.sweet-alert, .showSweetAlert, .confirm').parent().then(($el) => {
      const text = $el.text();
      expect(text).to.match(/Id:\s*\d+/i);
      expect(text).to.match(/Amount:\s*\d+/i);
    });

    cy.contains('button', /^OK$/i).click();
    cy.location('pathname').should('match', /index\.html|cart\.html/);
  });
});

// npx cypress open - run this commmand to open cypress window, then select E2e Testing, then select browser, then select this file.

