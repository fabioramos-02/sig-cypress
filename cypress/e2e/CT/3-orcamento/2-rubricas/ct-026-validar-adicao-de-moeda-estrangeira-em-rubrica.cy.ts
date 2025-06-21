describe('Validar adição de moeda estrangeira em Rubrica', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário adicione uma Rubrica com Moeda Estrangeira', () => {
        const rubrica = 1; // Seleciona o primeiro item da Rubrica
        const naturezaDespesa = 1; // Seleciona a primeira Natureza da Despesa
        const justificativaObrigatoria = true; // Marca a Justificativa Obrigatória
        const justificativaGlobal = false; // Não marca a Justificativa Global
        const moedaEstrangeira = true; // Marca Moeda Estrangeira
        const moedaSelecionada = 'Euro'; // Seleciona a moeda Euro

        cy.preencherRubrica(rubrica, naturezaDespesa, justificativaObrigatoria, justificativaGlobal, moedaEstrangeira, moedaSelecionada);
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão de salvar

        // Valida que a última linha da tabela mantém os dados inseridos
        cy.validarTabelaRubrica(rubrica, naturezaDespesa, moedaSelecionada, justificativaGlobal, justificativaObrigatoria);

        // Valida que o sistema permite salvar e avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Rubricas');  // Verifica se a aba 'Rubricas' está visível
    });

    //sistema mostra a mensagem: editalRubrica.0.Selecione ao menos uma moeda estrangeira.

    // Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para a próxima sub-step.
});
