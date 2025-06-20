describe('Adicionar o valor abaixo do inferior limite em campo de duração do projeto', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Não deve permitir que o usuário insira um valor abaixo do limite (0 meses)', () => {
    // Preenche as informações de restrições
    cy.preencherDuracaoDoProjeto(0); // Preenche a duração do projeto com o valor abaixo do limite

    // Valida que o sistema emite um alerta de erro
    cy.get('.error-message').should('be.visible') // Verifica se a mensagem de erro está visível
      .and('contain.text', 'O valor deve ser maior ou igual a 1'); // Verifica se a mensagem contém o texto esperado

    // Verifica que o campo de duração do projeto ainda está com valor inválido
    cy.get('[data-cy="duracaoProjetoEmMeses"]').should('have.value', '0'); // Garante que o campo não tenha sido preenchido com valor inválido
  });
});
