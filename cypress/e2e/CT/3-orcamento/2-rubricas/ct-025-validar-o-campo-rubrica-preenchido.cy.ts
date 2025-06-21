describe('Validar o campo Rubrica preenchido', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário selecione uma Rubrica e adicione Natureza da Despesa', () => {
    const rubrica = 1; // Seleciona o primeiro item da Rubrica
    const naturezaDespesa = 1; // Seleciona a primeira Natureza da Despesa
    const justificativaObrigatoria = true; // Marca a Justificativa Obrigatória
    const justificativaGlobal = true; // Marca a Justificativa Global
    const moedaEstrangeira = false; // Não marca Moeda Estrangeira

    // Preenche as informações de Rubrica e Natureza da Despesa
    cy.preencherRubrica(rubrica, naturezaDespesa, justificativaObrigatoria, justificativaGlobal, moedaEstrangeira);

    // Valida que o sistema permite salvar e avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Rubricas');  // Verifica se a aba 'Rubricas' está visível
  });

  // Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para a próxima sub-step.
});
