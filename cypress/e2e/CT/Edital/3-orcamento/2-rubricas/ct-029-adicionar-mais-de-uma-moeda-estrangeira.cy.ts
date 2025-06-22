describe('Adicionar mais de uma moeda estrangeira', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Não deve permitir adicionar mais de uma moeda estrangeira', () => {
    let rubricas = ['Diárias', 'Serviços de Terceiros', 'Material de Consumo', 'Material Permanente', 'Passagens', 'Pessoal', 'Encargos', 'Bolsa'];
    let naturezasDespesa = ['Custeio', 'Capital', 'Auxilio a pesquisador'];

    const rubrica = 'Diárias'; // Passa o nome da Rubrica diretamente
    const naturezaDespesa = 'Custeio'; // Passa o nome da Natureza da Despesa diretamente
    const justificativaObrigatoria = false; // Marca a Justificativa Obrigatória
    const justificativaGlobal = false; // Não marca a Justificativa Global
    const moedaEstrangeira = true; // Marca Moeda Estrangeira
    const moedasSelecionadas = ['Euro', 'Dólar']; // Tenta selecionar mais de uma moeda

    // Tenta preencher a rubrica com mais de uma moeda
    cy.preencherRubrica(rubricas.indexOf(rubrica), naturezasDespesa.indexOf(naturezaDespesa), justificativaObrigatoria, justificativaGlobal, moedaEstrangeira, moedasSelecionadas);

    cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão de salvar
    // Valida que o sistema não permite salvar e emite uma mensagem de erro
    cy.get('.MuiAlert-message')
      .should('contain.text', 'Apenas uma moeda pode ser selecioanda');  // Verifica que não é possível avançar
  });

  // Resultado esperado: O sistema deve alertar que é permitido adicionar apenas uma moeda estrangeira e não permitir que o usuário prossiga para a próxima sub-step.
});
