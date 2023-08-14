/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should hold on to an alias name', () => {
    cy.get('[data-test="items-unpacked"]').find('li').as('unpackedItems');
    cy.get('[data-test="items-packed"]').find('li').as('packedItems');

    cy.get('@unpackedItems').should('have.length', 4);
    cy.get('@packedItems').should('have.length', 1);

    cy.get('@unpackedItems').first().find('label').as('firstUnpackedItem');
    cy.get('@firstUnpackedItem').should('contain', 'Tooth Brush');
  });

  it('should hold on to alias and use it', () => {
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');

    cy.get('@unpackedItems').find('label').first().as('firstUnpackedItem');

    cy.get('@firstUnpackedItem').should('contain', 'Tooth Brush');
    cy.get('@firstUnpackedItem').invoke('text').as('firstUnpackedItemText');

    cy.get('@firstUnpackedItem').find('input[type="checkbox"]').click();

    cy.get('@firstUnpackedItemText').then((text) => {
      cy.get('@packedItems').find('label').first().should('contain', text);
    });
  });

  it('should filter unpacked items using filterItemsInput alias', () => {
    cy.get('[data-test="filter-items"]').as('filterItemsInput');
    cy.get('[data-test="items-unpacked"]').find('li').as('filteredUnpackedItems');

    cy.get('@filterItemsInput').type('Tooth');
    cy.get('@filteredUnpackedItems').should('have.length', 2);

    cy.get('@filteredUnpackedItems').each(($item) => {
      cy.wrap($item).should('contain', 'Tooth');
    });
  });
});

describe.only('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });

  it('should filter items', () => {
    cy.get('@filterInput').type('iPhone');
    cy.get('@allItems').should('not.contain.text', 'Hoodie');
  });

  it('should move items from one list to the other', () => {
    cy.get('@unpackedItems').find('li').first().as('itemInQuestion');
    cy.get('@itemInQuestion').find('label').as('itemInQuestionLabel');
    cy.get('@itemInQuestionLabel').invoke('text').as('itemInQuestionText');


    cy.get('@itemInQuestion').find('label').first().click();

    cy.get('@packedItems').find('li').should('have.length', 2);

    cy.get('@itemInQuestionText').then((text) => {
      cy.get('@packedItems').find('label').first().should('contain', text);
    });
  })
});
