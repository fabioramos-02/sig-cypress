describe('Valor Máximo na Faixa de Financiamento menor que o mínimo', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve bloquear quando o valor máximo for menor que o valor mínimo', () => {
    const nomeFaixa = "Teste"; // Nome da faixa de financiamento
    const valorMinimo = 400.00; // Valor mínimo
    const valorMaximo = 200.00; // Valor máximo menor que o mínimo
    const observacao = "O Teste foi executado e deve dar erro"; // Observação

    // Tenta preencher a faixa de financiamento com valores inválidos
    cy.preencherFaixaDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacao);

    // o sistema exibe a mensagem de erro: O valor máximo deve ser maior que o valor mínimo.
    // Verifica se o alerta de erro é exibido
     cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
        .and('contain.text', 'O valor máximo deve ser maior que o valor mínimo.'); // Verifica se a mensagem contém o texto esperado

  });

  // Resultado esperado: O sistema deve emitir um alerta de erro e bloquear o salvamento da faixa de financiamento.
});
