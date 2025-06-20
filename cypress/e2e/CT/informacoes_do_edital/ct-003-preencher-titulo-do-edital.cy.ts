describe('Preencher título do edital', () => {
  beforeEach(() => {
    cy.login(0); // Realiza login como Gestor (índice 0)
  });

  //CT 003 - Preencher título do edital
  it('Deve permitir preencher o título do edital e avançar para a próxima seção', () => {
    // Usando o comando customizado para preencher as informações do edital
    cy.preencherIdentificacaoDoEdital("Teste");

    // Finalizar o processo de criação do edital
    cy.salvarAndAvancar();

    // Resultado esperado: O sistema deve permitir que o usuário consiga salvar o estado atual do preenchimento do edital e prosseguir para Restrições.
  });

});
