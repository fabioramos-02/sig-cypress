describe('Validar o campo Programa preenchido', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário selecione um Programa e adicione a Natureza da Despesa', () => {
        const programa = 2; // O índice ou nome do programa selecionado (substitua conforme o que for necessário)
        const naturezaDespesa = 1; // O índice ou ID da natureza da despesa (substitua conforme o que for necessário)
        const valor = "100000"; // O valor da despesa

        // Preenche as informações de Orçamento e adiciona o Programa e a Natureza da Despesa
        cy.preencherPrograma(programa, naturezaDespesa, valor);
        cy.salvarAndAvancar(); // Clica no botão "Salvar" e tenta avançar para a próxima seção

        // Valida que o sistema permite salvar e avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Rubricas');  // Verifica se a aba 'Rubricas' está visível
    });

    //Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para próxima sub-step.
});
