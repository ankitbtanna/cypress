/// <reference types="cypress" />

describe('Create a New Item', () => {
    beforeEach(() => {
        cy.visit('/jetsetter');
    })

    it('should contain Applications as header', () => {
        cy.contains('h3', 'Applications').should('contain.text', 'Applications');
    });

    it('should highlight the Jetsetter App on the sidenav', () => {
        cy.get('nav#table-of-contents > ul > li:nth-child(1) > a').should('contain.text', 'Jetsetter');
        cy.get('nav#table-of-contents > ul > li:nth-child(1)').should('have.class', 'bg-purple-600')
    })
});
