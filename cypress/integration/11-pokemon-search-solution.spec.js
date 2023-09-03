/// <reference types="cypress" />

const pokemon = [
  { id: 1, name: 'Bumblesaur' },
  { id: 2, name: 'Charmer' },
  { id: 3, name: 'Turtle' },
];

describe('Pokémon Search', () => {
  beforeEach(() => {
    cy.visit('/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');

    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {
    cy.get('@search').type('Bumblesaur');
    cy.wait('@api').its('request.url').should('contain', 'Bumblesaur');
  });

  it('should update the query parameter', () => {
    cy.get('@search').type('Bumblesaur');
    cy.get('@label').should('have.text', 'Searching for… Bumblesaur');
    cy.location('search').should('equal', '?name=Bumblesaur')
  });

  it('should call the API with correct query parameter', () => {
    cy.get('@search').type('Bumblesaur');
    cy.wait('@api').then((interception) => {
      expect(interception.request.url).to.contain('Bumblesaur');
    }).its('request.url').should('contain', 'Bumblesaur');
  });

  it('should pre-populate the search field with the query parameter', () => {
    cy.visit({
      url: '/pokemon-search',
      qs: {
        name: 'Bumblesaur',
      }
    });
    cy.get('@search').should('have.value', 'Bumblesaur');
  });

  it('should render the results to the page', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('stubbed');
    cy.get('@search').type('ivy');
    cy.wait('@stubbed');
    cy.get('[data-test="result"]').should('have.length', 3);

    cy.intercept('/pokemon-search/api/1', { fixture: 'bulbasaur' }).as('bulbasaur-fixture');
    cy.get('[data-test="result"] a').first().click();
  });

  it('should link to the correct pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('api');
    cy.get('@search').type('ivy');
    cy.get('[data-test="result"] a').each(($el, index) => {
      const { id } = pokemon[index];
      expect($el.attr('href')).to.contain('/pokemon-search/' + id);
    });
  });

  it('should persist the query parameter in the link to a pokémon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemon }).as('api');
    cy.get('@search').type('ivy');
    cy.get('[data-test="result"] a').each(($el, index) => {
      const { id } = pokemon[index];
      expect($el.attr('href')).to.contain('/pokemon-search/' + id);
    });
    cy.get('@api').its('request.url').should('contain', 'ivy');
  });

  it('should bring you to the route for the correct pokémon', () => {});

  it('should immediately fetch a pokémon if a query parameter is provided', () => {});
});
