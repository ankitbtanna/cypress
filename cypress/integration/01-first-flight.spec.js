/// <reference types="cypress" />

describe('Create a New Item', () => {
    beforeEach(() => {
        cy.visit('/jetsetter');
    })

    it('should contain Applications as header', () => {
        cy.contains('h3', 'Applications').should('contain.text', 'Applications');
    });
});
