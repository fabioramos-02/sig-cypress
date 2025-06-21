describe('Adicionar a mesma Rubrica mais de uma vez', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Não deve permitir adicionar a mesma Rubrica mais de uma vez', () => {
    let rubricas = ['Diárias', 'Serviços de Terceiros', 'Material de Consumo', 'Material Permanente', 'Passagens', 'Pessoal', 'Encargos', 'Bolsa'];
    let naturezasDespesa = ['Custeio', 'Capital', 'Auxilio a pesquisador'];

    const rubrica = 'Diárias'; // Passa o nome da Rubrica diretamente
    const naturezaDespesa = 'Custeio'; // Passa o nome da Natureza da Despesa diretamente
    const justificativaObrigatoria = true; // Marca a Justificativa Obrigatória
    const justificativaGlobal = false; // Não marca a Justificativa Global
    const moedaEstrangeira = true; // Seleciona Moeda Estrangeira
    const moedaSelecionada = 'Euro'; // Seleciona a moeda Euro

    // Preenche as informações com as variáveis definidas para a primeira rubrica
    cy.preencherRubrica(rubricas.indexOf(rubrica), naturezasDespesa.indexOf(naturezaDespesa), justificativaObrigatoria, justificativaGlobal, moedaEstrangeira, moedaSelecionada);
    cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão de salvar

    // Tenta adicionar novamente a mesma rubrica
    cy.preencherRubrica(rubricas.indexOf(rubrica), naturezasDespesa.indexOf(naturezaDespesa), justificativaObrigatoria, justificativaGlobal, moedaEstrangeira, moedaSelecionada);
    
    // O sistema deve impedir a adição da mesma rubrica mais de uma vez e exibir uma mensagem de erro ou impedir a seleção da mesma rubrica
    cy.get('.MuiTableBody-root > .MuiTableRow-root').should('have.length', 1);  // Verifica que apenas uma rubrica foi adicionada na tabela

    // Mensagem de erro ou alerta pode ser verificada aqui
    cy.contains('Rubrica já foi adicionada').should('be.visible');  // Exemplo de verificação de mensagem de erro
  });

  // Resultado esperado: O sistema não deve permitir adicionar a mesma Rubrica mais de uma vez e deve exibir uma mensagem de erro
});
