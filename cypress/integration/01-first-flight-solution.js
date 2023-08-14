/// <reference types="cypress" />

describe('Create a new item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should have a form', () => {
    cy.get('form').should('exist');
  });

  it('should have words "Add Item"', () => {
    cy.contains('Add Item').should('exist');
  });

  it('should put stuff in an input field', () => {
    cy.get('[data-test="new-item-input"]').type('Good Attitude');
  })
});
