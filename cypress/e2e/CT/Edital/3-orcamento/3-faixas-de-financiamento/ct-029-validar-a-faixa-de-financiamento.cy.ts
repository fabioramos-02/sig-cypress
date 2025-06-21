describe('Validar a Faixa de Financiamento', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário adicione uma Faixa de Financiamento', () => {
    const nomeFaixa = "Teste"; // Nome da faixa de financiamento
    const valorMinimo = 4.00; // Valor mínimo
    const valorMaximo = 40.00; // Valor máximo
    const observacao = "O Teste foi executado"; // Observação

    // Chama o comando reutilizável para preencher a faixa de financiamento
    cy.preencherFaixaDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacao);

    // Valida que a Faixa de Financiamento foi salva corretamente
    cy.validarTabelaFaixasDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacao);

    // Verifica que o sistema permite salvar e avançar
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Faixas de Financiamento');  // Verifica que a aba 'Faixas de Financiamento' está visível
  });

  // Resultado esperado: O sistema deve permitir que o usuário salve e prossiga normalmente com a Faixa de Financiamento.
});
