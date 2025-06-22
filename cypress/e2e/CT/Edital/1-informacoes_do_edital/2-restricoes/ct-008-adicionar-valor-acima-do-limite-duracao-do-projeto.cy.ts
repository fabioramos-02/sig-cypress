describe('Adicionar o valor acima do superior limite em campo de duração do projeto', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Não deve permitir que o usuário insira um valor acima do limite (101 meses)', () => {
    // Preenche as informações de restrições
    cy.preencherDuracaoDoProjeto(101); // Preenche com um valor acima do limite de 100 meses

    // Valida que o sistema emite um alerta de erro
    cy.get('.error-message')
      .should('be.visible') // Verifica se a mensagem de erro está visível
      .and('contain.text', 'O valor deve ser menor ou igual a 100'); // Verifica a mensagem de erro

    // Verifica que o campo de duração do projeto ainda está com o valor inválido
    cy.get('[data-cy="duracaoProjetoEmMeses"]').should('have.value', '101'); // Garante que o valor não foi aceito

    // Resultado esperado: O sistema deve alertar o usuário que não é possível prosseguir ou salvar para próxima sub-step, e que ele deve inserir um valor menor ou igual a 100.
  });
});
