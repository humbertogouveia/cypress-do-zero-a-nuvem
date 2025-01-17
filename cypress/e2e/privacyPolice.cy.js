/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  const user = {}
  const textTitle = 'Central de Atendimento ao Cliente TAT - Política de Privacidade'
  const pTagText = 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.'

  beforeEach(() => {
    cy.visit("./src/privacy.html")
    
  })
  it("Validade the title of aplicattion", () => {
    cy.title().should('be.equal',textTitle)
    cy.get('p').first().should('have.text',pTagText)
  })

})
