describe('Validar o campo Programa preenchido', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário selecione um Programa e adicione a Natureza da Despesa', () => {
        let despesa = ['Custeio', 'Capital', 'Auxilio a pesquisador']
        const programa = 3; // O índice ou nome do programa selecionado (substitua conforme o que for necessário)
        const naturezaDespesa = 1; // O índice ou ID da natureza da despesa (substitua conforme o que for necessário)
        const valor = " 100,00"; // O valor da despesa

        // Preenche as informações de Orçamento e adiciona o Programa e a Natureza da Despesa
        cy.preencherPrograma(programa, naturezaDespesa, valor);
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar

        cy.wait(1000); // Aguarda 1 segundo para garantir que a tabela seja atualizada
        //verifica se a tebla foi preenchida corretamente para Natureza da Despesa
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').eq(0).should('contain.text', despesa[naturezaDespesa]); // Verifica se o Programa foi adicionado corretamente

        //sistema apresenta mensagem: naturezaDespesaEdital.0.O naturezaDespesaId deve ser um número inteiro.
        
    });

    //Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para próxima sub-step.

});
