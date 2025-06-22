describe('Validar adição de moeda estrangeira em Rubrica', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário adicione uma Rubrica com Moeda Estrangeira', () => {
    let rubricas = ['Diárias', 'Serviços de Terceiros', 'Material de Consumo', 'Material Permanente', 'Passagens', 'Pessoal', 'Encargos', 'Bolsa'];
    let naturezasDespesa = ['Custeio', 'Capital', 'Auxilio a pesquisador'];

    const rubrica = 'Diárias'; // Passa o nome da Rubrica diretamente
    const naturezaDespesa = 'Custeio'; // Passa o nome da Natureza da Despesa diretamente
    const justificativaObrigatoria = false; // Marca a Justificativa Obrigatória
    const justificativaGlobal = false; // Não marca a Justificativa Global
    const moedaEstrangeira = true; // Marca Moeda Estrangeira
    const moedaSelecionada = 'Euro'; // Seleciona a moeda Euro

    // Preenche as informações com as variáveis definidas
    cy.preencherRubrica(rubricas.indexOf(rubrica), naturezasDespesa.indexOf(naturezaDespesa), justificativaObrigatoria, justificativaGlobal, moedaEstrangeira, moedaSelecionada);
    cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão de salvar

    // Valida que a última linha da tabela mantém os dados inseridos
    console.log(`Rubrica: ${rubrica}, Natureza da Despesa: ${naturezaDespesa}, Moeda Selecionada: ${moedaSelecionada}, Justificativa Global: ${justificativaGlobal}, Justificativa Obrigatória: ${justificativaObrigatoria}`);
    cy.validarTabelaRubrica(rubrica, naturezaDespesa, moedaSelecionada, justificativaGlobal, justificativaObrigatoria);

    // Valida que o sistema permite salvar e avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Rubricas');  // Verifica se a aba 'Rubricas' está visível
  });

  // Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para a próxima sub-step.
});
