describe('Adicionar o valor máximo em campo de duração do projeto', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Login como Gestor (índice 0)
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário insira o valor máximo permitido para a duração do projeto', () => {
    // Preenche as informações de restrições
    cy.preencherDuracaoDoProjeto(100); // Preenche a duração do projeto com 6 meses
    // preencherDuracaoMaximaDoProjeto();

    // Valida que o sistema permite avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Termo de Aceite');  // Verifica se a aba 'Termo de Aceite' está visível
  });

});
// Resultado esperado: O sistema deve permitir que o usuário insira o valor máximo permitido para a duração do projeto