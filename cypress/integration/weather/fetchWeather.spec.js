/// <reference types="cypress" />

context('Fetch Weather data', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/weather**'
    }).as('weatherRequest');

    cy.visit('/');
    cy.mockGeolocation();
  });

  it('updates data', () => {
    cy.get('.fade.show').should('have.length', 1);
    cy.wait('@weatherRequest', { timeout: 30000 }).then((xhr) => {
      cy.get('.fade.show').should('have.length', 0);
      cy.get('h1').should('have.text', 'Dados climáticos de Fortaleza');
      expect(xhr.status).to.equal(200);
      expect(xhr.response.body.name).to.equal('Fortaleza');
    });
    cy.get('.btn-primary').should('have.length', 1);
    cy.get('.fade.show').should('have.length', 0);
    cy.get('.btn-primary').click();

    cy.wait('@weatherRequest', { timeout: 30000 }).then((xhr) => {
      cy.get('h1').should('have.text', 'Dados climáticos de Fortaleza');
      expect(xhr.status).to.equal(200);
      expect(xhr.response.body.name).to.equal('Fortaleza');
    });
  });

  it('shows temperature data', () => {
    cy.get(':nth-child(1) > .collapse.show').should('have.length', 0);
    cy.wait('@weatherRequest', { timeout: 30000 }).then((xhr) => {
      cy.get('h1').should('have.text', 'Dados climáticos de Fortaleza');
      expect(xhr.status).to.equal(200);
      expect(xhr.response.body.name).to.equal('Fortaleza');

      cy.get(':nth-child(1) > .card-header > .btn').should('have.text', 'Temperatura');
      cy.get(':nth-child(1) > .card-header > .btn').click();
      cy.get(':nth-child(1) > .collapse.show').should('have.length', 1);
    });
  });

  it('shows wind data', () => {
    cy.get(':nth-child(2) > .collapse.show').should('have.length', 0);
    cy.wait('@weatherRequest', { timeout: 30000 }).then((xhr) => {
      cy.get('h1').should('have.text', 'Dados climáticos de Fortaleza');
      expect(xhr.status).to.equal(200);
      expect(xhr.response.body.name).to.equal('Fortaleza');

      cy.get(':nth-child(2) > .card-header > .btn').should('have.text', 'Vento');
      cy.get(':nth-child(2) > .card-header > .btn').click();
      cy.get(':nth-child(2) > .collapse.show').should('have.length', 1);
    });
  });
});
