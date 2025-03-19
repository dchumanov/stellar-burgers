import tokens from '../fixtures/tokens.json';
import { setCookie, deleteCookie } from '../../src/utils/cookie';
import order from '../fixtures/order.json';

Cypress.Commands.add('clickButton', (name) => {
  cy.get(`${name}`).find('button').click();
});

describe('Тест главной страницы', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');

    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093d'}]`).as('testBun');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa0940'}]`).as('testFilling');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa0943'}]`).as('testSauce');
  });

  it('Добавление элементов в конструктор', () => {
    cy.clickButton('@testBun');
    cy.get('[data-cy="constructorItemBun"]')
      .find('span')
      .contains('Флюоресцентная булка R2-D3')
      .should('exist');

    cy.clickButton('@testFilling');
    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Говяжий метеорит (отбивная)')
      .should('exist');

    cy.clickButton('@testSauce');
    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Соус фирменный Space Sauce')
      .should('exist');
  });

  describe('Тест модального окна ингрединта', () => {
    beforeEach(() => {
      cy.get('@testBun').find('a').click();
      cy.get('[data-cy="modal"]').as('modal');
    });

    it('открытие окна', () => {
      cy.get('@modal').should('exist');
    });

    it('закрытие по клику на крестик', () => {
      cy.clickButton('@modal');
      cy.get('@modal').should('not.exist');
    });

    it('закрытие по клику на оверлей', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('Тест на создание заказа', () => {
    beforeEach(() => {
      cy.visit('/');
      setCookie('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.wait('@getUser');
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'getOrder'
      );
    });

    afterEach(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });

    it('отправка заказа', () => {
      cy.clickButton('@testBun');
      cy.clickButton('@testFilling');
      cy.clickButton('@testSauce');

      cy.get('[data-cy="orderButton"]').should('be.enabled').click();
      cy.wait('@getOrder');

      cy.get('[data-cy="modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').find('h2').contains(order.order.number);

      cy.clickButton('@modal');
      cy.get('@modal').should('not.exist');

      cy.get('[data-cy="constructorItemNoBun"]').should('exist');
      cy.get('[data-cy="constructorItemNoFillings"]').should('exist');
    });
  });
});
