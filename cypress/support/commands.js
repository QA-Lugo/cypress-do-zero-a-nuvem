Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
 nome: 'Luã',
 sobrenome: 'Silveira',
 email: 'luag@test.com',
 text: 'Test.'
}) => {    
    cy.get('#firstName').type(data.nome) 
    cy.get('#lastName').type(data.sobrenome)  
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})