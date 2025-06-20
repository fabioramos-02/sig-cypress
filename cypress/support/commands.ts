import 'cypress-iframe';
import 'cypress-real-events';
// cypress/support/commands.ts
Cypress.Commands.add('typelogin', () => {
  // Carregar o arquivo JSON de credenciais
  cy.fixture('credenciais_sistema.json').then((credenciais) => {
    const { login, senha } = credenciais.credenciais[0]; // Usando o primeiro conjunto de credenciais (grupo1_gestor@sig.com)

    // Acessar o sistema com a URL e as credenciais
    cy.visit(credenciais.url_sistema);
    cy.get('#login').type(login);
    cy.get('#senha').type(senha);
    cy.get('.css-1wz47u4 > .MuiButton-root').click(); // Botão Acessar da página de login
  });

});

Cypress.Commands.add('login', (tipoUsuario = 0) => {
  // Carregar o arquivo JSON de credenciais
  cy.fixture('credenciais_sistema.json').then((credenciais) => {
    const { login, senha } = credenciais.credenciais[tipoUsuario]; // Usando o índice para selecionar as credenciais

    // Acessar o sistema com a URL e as credenciais
    cy.visit(credenciais.url_sistema);
    cy.get('#login').type(login);
    cy.get('#senha').type(senha);
    cy.get('.css-1wz47u4 > .MuiButton-root').click(); // Botão Acessar da página de login
  });
});

Cypress.Commands.add('preencherIdentificacaoDoEdital', (titulo: string) => {
  cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
  cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
  cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
  cy.get('.css-jir0u').click(); // Fecha o menu lateral

  // Preenchendo o título do Edital conforme o formato especificado
  cy.get('[data-cy="nome"]').type(titulo, { delay: 0 });
});

// Comando para clicar no botão Salvar e avançar
Cypress.Commands.add('salvarAndAvancar', () => {
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar
  cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar
});

// Comando para preencher a duração do projeto com um valor específico
Cypress.Commands.add('preencherDuracaoDoProjeto', (valor: number) => {
  cy.get('[data-cy="restricoes"]').click(); // Clica na aba 'Restrições'
  cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
  cy.get('[data-cy="duracaoProjetoEmMeses"]').clear().type(valor.toString()); // Preenche com o valor passado como parâmetro
  cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar a duração do projeto
});