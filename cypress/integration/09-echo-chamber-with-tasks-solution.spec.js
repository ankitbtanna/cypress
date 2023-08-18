/// <reference types="cypress" />

const user = {
  email: `first@example.com`,
  password: 'password123',
};

describe('Sign Up', () => {

  beforeEach(() => {
    cy.task('reset').then(() => {
      console.log('Database reset');
    });
  });

  it('should successfully create a user when entering an email and a password', () => {
    // Sign Up
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').type(user.email);
    cy.get('[data-test="sign-up-password"]').type(user.password);
    cy.get('[data-test="sign-up-submit"]').click();

    // Sign In
    cy.visit('/echo-chamber/sign-in');
    cy.get('[data-test="sign-in-email"]').type(user.email);
    cy.get('[data-test="sign-in-password"]').type(user.password);
    cy.get('[data-test="sign-in-submit"]').click();

    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email);
  });
});

describe('User already exists', () => {
  beforeEach(() => {
    cy.task('reset').then(() => {
      console.log('Database reset');
    });

    cy.task('seed').then(() => {
      console.log('Database seeded');
    });
  });

  it('should show that user already exists if we try to sign up with first@example.com', () => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').type(user.email);
    cy.get('[data-test="sign-up-password"]').type(user.password);
    cy.get('[data-test="sign-up-submit"]').click();

    cy.contains('A user already exists with that email.').should('be.visible');
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.task('reset').then(() => {
      console.log('Database reset');
    });

    cy.task('seed').then(() => {
      console.log('Database seeded');
    });
  });

  it.only('should successfully sign in when entering an email and a password', () => {
    cy.visit('/echo-chamber/sign-in');
    cy.get('[data-test="sign-in-email"]').type(user.email);
    cy.get('[data-test="sign-in-password"]').type(user.password);
    cy.get('[data-test="sign-in-submit"]').click();

    cy.location('pathname').should('contain', '/echo-chamber/posts');
    cy.contains('Signed in as ' + user.email).should('be.visible');
  });
});
