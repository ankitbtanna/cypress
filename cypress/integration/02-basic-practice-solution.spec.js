/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  context('Use jetsetter app', () => {
    it('should be able to add a new item', () => {
      cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 4);

      cy.get('[data-test="new-item-input"]').type('Good Attitude');
      cy.get('[data-test="add-item"]').click();

      cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 5);
    });

    context('Filtering stuff', () => {
      beforeEach(() => {
        cy.get('[data-test="new-item-input"]').type('Good Attitude');
        cy.get('[data-test="add-item"]').click();
      });

      it('should show no items to show if random gibberish is entered in the input', () => {
        cy.get('[data-test="items-unpacked"]')
          .find('[data-test="items-empty-state"]')
          .should('not.exist');
        cy.get('[data-test="items-packed"]')
          .find('[data-test="items-empty-state"]')
          .should('not.exist');

        cy.get('[data-test="filter-items"]').type('socks');
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 0);

        cy.get('[data-test="items-unpacked"]')
          .find('[data-test="items-empty-state"]')
          .should('exist');
        cy.get('[data-test="items-packed"]')
          .find('[data-test="items-empty-state"]')
          .should('exist');
      });

      it('should show only items that match the filter', () => {
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 5);

        cy.get('[data-test="filter-items"]').type('Tooth');
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 2);

        cy.get('[data-test="items-unpacked"] li').each(($item) => {
          expect($item.text()).to.include('Tooth');
        });

        cy.get('[data-test="filter-items"]').clear();

        cy.get('[data-test="filter-items"]').type('Hoodie');
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 1);
        cy.get('[data-test="items-packed"] li').should('have.length', 1).each(($item) => {
          expect($item.text()).to.include('Hoodie');
        });
      });
    });

    context('Remove items', () => {
      it('should have 4 items in the unpacked list and 1 item in the packed list', () => {
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 4);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 1);

        cy.get('[data-test="remove-all"]').click();

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 0);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 0);

        cy.get('[data-test="items-unpacked"]')
          .find('[data-test="items-empty-state"]')
          .should('exist');
        cy.get('[data-test="items-packed"]')
          .find('[data-test="items-empty-state"]')
          .should('exist');
      });

      it('should remove individual items from unpacked and packed items', () => {
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 4);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 1);

        cy.get('[data-test="items-unpacked"]').find('[data-test="remove"]').first().click();
        cy.get('[data-test="items-packed"]').find('[data-test="remove"]').first().click();

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 3);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 0);
      });

      it.only('should remove all items from unpacked list one by one', () => {
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 4);

        cy.get('[data-test="items-unpacked"] li').each(($item) => {
          cy.wrap($item).find('[data-test="remove"]').click();
        });

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 0);
      })
    })

    context('Mark all as unpacked', () => {
      it('should mark all packed items as unpacked', () => {
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 4);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 1);

        cy.get('#item-2').click();

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 3);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 2);

        cy.get('[data-test="mark-all-as-unpacked"]').click();

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 5);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 0);
      });
    });

    context('Marking individual item as packed', () => {
      it('should mark individual items as packed', () => {
        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 4);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 1);

        cy.get('#item-2').click();

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 3);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 2);

        cy.get('#item-3').click();

        cy.get('[data-test="items-unpacked"]').find('label').should('have.length', 2);
        cy.get('[data-test="items-packed"]').find('label').should('have.length', 3);
      });
    });
  });
});
