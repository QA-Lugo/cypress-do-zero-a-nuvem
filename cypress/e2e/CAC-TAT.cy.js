///<reference types = "cypress"/>

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })


  it('Verifica o título da página', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Prenche os campos obrigatórios e envia o formulário', () => {
    
    cy.get('#firstName')
      .as('nome')
      .should('be.visible')
    cy.get('@nome')
      .type('Luã Gustavo')
      .should('have.value', 'Luã Gustavo')
    
    cy.get('#lastName')
      .type('Silveira')
      .should('have.value', 'Silveira')
    
    cy.get('#email')
      .type('test@mail.com')
      .should('have.value', 'test@mail.com')
    
    cy.get('#phone')
      .type('5197478985')
      .should('have.value', '5197478985')
    
    cy.get('#open-text-area')
      .type('um elogio qualquer')
      .should('have.value', 'um elogio qualquer')
    
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    
    cy.get('#firstName').type('Luã Gustavo') 
    cy.get('#lastName').type('Silveira')  
    cy.get('#email').type('testmail.com')
    cy.get('#phone').type('5197478985')
    cy.get('#open-text-area').type('um elogio qualquer', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preencher um valor não-numérico', () => {
    cy.get('#phone').type('abcd').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').type('Luã Gustavo') 
    cy.get('#lastName').type('Silveira')  
    cy.get('#email').type('testmail.com')
    cy.get('#phone').type('5197478985')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('um elogio qualquer', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    
  });

  it('seleciona um produto (Blog) por seu índice', () => {

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    
  });

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
    
  });

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
      .each( tipoDeAtendimento => { //each é uma função que recebe como argumento um array, que neste caso é o tipoDeAtendimento que
                                    // tem o valor dos 3 radio buttons e ele faz um loop com cada indice do array verificando se está checked
        cy.wrap(tipoDeAtendimento) //"empacota" os valores recebido pelo each permitindo usar os comandos encadeados check e should
          .check()
          .should('be.checked')
      })
    
  });

  it('marca ambos os checkboxes, depois demarca o último ', () => {

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    
  });

  it('seleciona um arquivo da pasta fixtures', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
        console.log(input[0].files[0].name)
      })
    
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) //drag-and-drop não aparece visualmente no playground do cypress
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
        console.log(input[0].files[0].name)
      })
    
  });

  it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('upload');
    cy.get('#file-upload')
      .selectFile('@upload')
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
        console.log(input[0].files[0].name)
      })
    
  });

})