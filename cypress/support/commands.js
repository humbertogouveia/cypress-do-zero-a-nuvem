// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillSignupForm', user=> {
    cy.contains('h1','CAC TAT')
    .should('be.visible')

    cy.contains('a','Política de Privacidade')
    .should('be.visible')

    cy.get('#firstName')
    .should('be.visible')
    .type(user.firstName)
    .should('have.value',user.firstName)

    cy.get('#lastName')    
    .should('be.visible')
    .type(user.surname)
    .should('have.value',user.surname)

    cy.get('#email')    
    .should('be.visible')
    .type('humberto@gouveia.com')
    .should('have.value',user.email)

    cy.get('#product')
    .should('be.visible')
    .select('cursos')
    .should('have.value','cursos')
  
    cy.get(':nth-child(3) > input')
    .should('not.be.checked')
    .check()
    .should('be.checked')

    cy.get('#email-checkbox')
    .should('not.be.checked')
    .check()
    .should('be.checked')

    cy.get('#open-text-area')
    .should('be.visible')
    .type(user.text,{delay: 100})
    .should('have.value',user.text)

    cy.contains('button','Enviar')
    .should('be.enabled')
    .click()

    cy.get('.success')
    .should('be.visible')
    .and('contain.text','Mensagem enviada com sucesso.')

})