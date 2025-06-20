describe('Login de Pesquisador falho', () => {
  beforeEach(() => {
    // Realiza o login no sistema antes de cada teste
    cy.fixture('credenciais_sistema.json').then((credenciais) => {
      // A URL do sistema deve estar no arquivo JSON de credenciais
      cy.visit(credenciais.url_sistema);
    });
  });

  it('Deve apresentar erro ao tentar logar com credenciais incorretas', () => {
    // Inserir email incorreto
    cy.get('#login').type('teste@gmail.com', { delay: 0 }); // Preenche o campo de email com o valor de exemplo
    
    // Inserir senha incorreta
    cy.get('#senha').type('senha123@', { delay: 0 }); // Preenche o campo de senha com o valor de exemplo

    // Clicar no botão "Acessar"
    cy.get('.css-1wz47u4 > .MuiButton-root').click();

    // **Resultado Esperado**:
    // O sistema deve apresentar uma mensagem informando que não foi possível realizar o login
    // e não autorizar o usuário a entrar no sistema.

    // Validar o resultado esperado: Mensagem de erro deve ser exibida
    cy.get('.erro-login')  // Alterar para o seletor correto da mensagem de erro no seu sistema
      .should('be.visible') // Verifica se a mensagem de erro está visível
      .and('contain.text', 'Não foi possível realizar o login'); // Verifica se o texto da mensagem de erro está correto
  });
});
