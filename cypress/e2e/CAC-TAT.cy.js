/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  const user = {}

  beforeEach(() => {
    cy.visit("./src/index.html")
    user.firstName = "Humberto"
    user.surname = "Gouveia"
    user.email = "humberto@gouveia.com"
    user.text = "Vai Corinthians!"
  })

  it("Validade the title of aplicattion", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
  })

  it("Fill in the required fields and submit the form", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Humberto")
      .should("have.value", "Humberto")

    cy.get("#lastName")
      .should("be.visible")
      .type("Gouveia")
      .should("have.value", "Gouveia")

    cy.get("#email")
      .should("be.visible")
      .type("humberto@gouveia.com")
      .should("have.value", "humberto@gouveia.com")

    cy.get("#product")
      .should("be.visible")
      .select("cursos")
      .should("have.value", "cursos")

    cy.get(":nth-child(3) > input")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#email-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Vai Corinthians!", { delay: 100 })
      .should("have.value", "Vai Corinthians!")

    cy.get('button[type="submit"]').should("have.text", "Enviar").click()

    cy.get(".success")
      .should("be.visible")
      .and("contain.text", "Mensagem enviada com sucesso.")
  })

  it("Display an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Humberto")
      .should("have.value", "Humberto")

    cy.get("#lastName")
      .should("be.visible")
      .type("Gouveia")
      .should("have.value", "Gouveia")

    cy.get("#email")
      .should("be.visible")
      .type("humberto")
      .should("have.value", "humberto")

    cy.get("#phone").type("abcde").should("be.empty")

    cy.get("#product")
      .should("be.visible")
      .select("cursos")
      .should("have.value", "cursos")

    cy.get(":nth-child(3) > input")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#email-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Vai Corinthians!", { delay: 100 })
      .should("have.value", "Vai Corinthians!")

    cy.get(".button").should("have.text", "Enviar").click()

    cy.get(".error")
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!")
  })

  it("Marcar opções e no final desmarcar somente a primeira", () => {
    cy.get('input[type="checkbox"]').check().last().uncheck()
  })

  it("Displays an error message whem telephone field, becomes mandatory but is not filled in before submitting the form", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Humberto")
      .should("have.value", "Humberto")

    cy.get("#lastName")
      .should("be.visible")
      .type("Gouveia")
      .should("have.value", "Gouveia")

    cy.get("#email")
      .should("be.visible")
      .type("humberto")
      .should("have.value", "humberto")

    cy.get("#phone").type("abcde").should("be.empty")

    cy.get("#product")
      .should("be.visible")
      .select("cursos")
      .should("have.value", "cursos")

    cy.get("input[type=radio][value=elogio]")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#email-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#phone-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Vai Corinthians!", { delay: 100 })
      .should("have.value", "Vai Corinthians!")

    cy.get(".button").should("have.text", "Enviar").click()

    cy.get(".error")
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!")
  })

  it("Fill in and clear the name, surname, email and telephone", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Humberto")
      .should("have.value", "Humberto")
      .clear()

    cy.get("#lastName")
      .should("be.visible")
      .type("Gouveia")
      .should("have.value", "Gouveia")
      .clear()

    cy.get("#email")
      .should("be.visible")
      .type("humberto@gouveia.com")
      .should("have.value", "humberto@gouveia.com")
      .clear()

    cy.get("#phone").type("12345").should("have.value", "12345").clear()

    cy.get("#email-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#phone-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")
  })

  it("Extra 6 - Displays a message error when submitting the form without filling in the required fields", () => {
    const longtext = Cypress._.repeat("abcdefghijk", 10)

    cy.get("#email-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#phone-checkbox")
      .should("not.be.checked")
      .check()
      .should("be.checked")

    cy.get("#open-text-area")
      .should("be.visible")
      .type(longtext)
      .should("have.value", longtext)

    cy.get(".button").should("have.text", "Enviar").click()

    cy.get(".error")
      .should("be.visible")
      .and("contain.text", "Valide os campos obrigatórios!")
  })

  it("Extra 7 - Sucessfully submits the form using a custom command", () => {
    cy.fillSignupForm(user)
  })

  it("Select one product (YouTube) for you text", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube")
  })

  it("Extra 3.1 - Select a product (Mentoria) based on its value", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria")
  })

  it('Check the type of atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked", "Feedback")
  })

  it("Check all type of services", () => {
    cy.get('input[type="radio"]').each((allTypeOfServices) => {
      cy.wrap(allTypeOfServices).check().should("be.checked")
    })
  })

  it("seleciona um arquivo da pasta fixtures",()=>{
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop',()=>{
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',()=>{
    cy.fixture("example").as('arquivo')
    
    cy.get('#file-upload')
    .selectFile('@arquivo')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
    cy.get('a')
    .should('have.attr','target','_blank')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
    cy.get('a')
    .should('have.attr','target','_blank')
    .invoke('removeAttr','target')
    .click()

    cy.get('h1').should('contain.text','CAC TAT - Política de Privacidade')
  })

  it('testa a página da política de privacidade de forma independente',()=>{
    cy.visit('/privacy')
  })
})
