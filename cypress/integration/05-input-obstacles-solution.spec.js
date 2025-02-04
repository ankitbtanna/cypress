/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select('Hulk');
    cy.get('[data-test="select-result"]').contains('Hulk');
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]');
    cy.get('[data-test="checkbox-result"]').contains('(None)');
    cy.get('[data-test="checkbox-lettuce"]').check();
    cy.get('[data-test="checkbox-tomato"]').check();
    cy.get('[data-test="checkbox-result"]').contains('Lettuce, Tomato');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');
  });

  it('should find and control a color input', () => {
    cy.get('[data-test="color-input"]').invoke('val', '#ffffff').trigger('input');
    cy.get('[data-test="color-result"]').contains('#ffffff');
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]').invoke('val', '2021-12-17');
    cy.get('[data-test="date-result"]').contains('2021-12-17');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', '7').trigger('input');
    cy.get('[data-test="range-result"]').contains('7');
  });

  it.only('should find and control a file input', () => {
    cy.get('[data-test="file-input"]').selectFile('val', '/Users/atanna/Desktop/Screenshots/sc1.png');
    cy.get('[data-test="file-result"]').contains('/Users/atanna/Desktop/Screenshots/sc1.png');
  });
});
