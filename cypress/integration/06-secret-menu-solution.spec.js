/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for(let property of properties) {
    it(`should have a column named ${property}`, () => {
      cy.get(`#${property}-column`).should('exist');
    });

    it('should hide the column if unchecked', () =>{
      cy.get(`#show-${property}`).uncheck();
      cy.get(`#${property}-column`).should('be.hidden');
    })
  }

  for (let restaurant of restaurants) {
    it(`should only display items only from the ${restaurant} restaurant that is selected`, () => {
      cy.get('#restaurant-visibility-filter').select(restaurant);
      cy.get('td[headers="whereToOrder-column"').each(($td) => {
        cy.wrap($td).find('.cell').should('contain.text', restaurant);
      });
    });
  }

  describe('Rating Filter', () => {
    beforeEach(() => {
      cy.get('#minimum-rating-visibility').as('ratingFilter');
    });

    for (let rating of ratings) {
      it.only(`should only display items with a rating of ${rating} or higher`, () => {
        cy.get('@ratingFilter').invoke('val', rating).trigger('change');
        cy.get('td[headers="popularity-column"').each(($td) => {
          const ratingText = $td.find('.cell').text();
          const ratingNumber = parseInt(ratingText);
          expect(ratingNumber).to.be.gte(rating);
        });
      });
    }
  })
});
