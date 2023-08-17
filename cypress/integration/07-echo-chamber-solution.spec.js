/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"]').click();
    cy.location('pathname').should('equal', '/echo-chamber/sign-in');
  });

  it.only('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test="sign-up"]').click();
    cy.location('pathname').should('equal', '/echo-chamber/sign-up');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
  });

  it('should require an email', () => {
    cy.get('[data-test="sign-up"]').click();
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);
  });

  it('should require that the email actually be an email address', () => {
    cy.get('[data-test="sign-up-email"]').type('not-an-email');
    cy.get('[data-test="sign-up"]').click();
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);
  });

  it.only('should require a password when the email is present', () => {
    cy.get('[data-test="sign-up-email"]').type('abc@gmail.com');
    cy.get('[data-test="sign-up"]').click();
    cy.get('[data-test="sign-up-password"]:invalid').should('have.length', 1);
  });
});
