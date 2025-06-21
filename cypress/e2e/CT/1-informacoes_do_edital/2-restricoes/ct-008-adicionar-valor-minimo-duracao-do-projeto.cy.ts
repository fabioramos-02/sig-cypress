describe('Adicionar o valor mínimo em campo de duração do projeto', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário insira o valor mínimo permitido para a duração do projeto (1 mês)', () => {
    // Preenche as informações de restrições com o valor mínimo
    cy.preencherDuracaoDoProjeto(1); // Preenche com o valor mínimo de 1 mês

    // Valida que o sistema permite avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Termo de Aceite');  // Verifica se a aba 'Termo de Aceite' está visível

      //resulta esperado: O sistema deve permitir que o usuário consiga salvar e/ou prosseguir para próxima etapa da criação de edital.
  });
});
