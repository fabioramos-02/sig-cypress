describe('Adicionar um indicador de produção', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário adicione um indicador de produção', () => {
        const indicador = 'Produção Cultural'; // Indicador de Produção selecionado

        // Adiciona o indicador de produção
        cy.adicionarIndicadorDeProducao(indicador); // Passa o nome do indicador

        // Verifica se o sistema permite salvar e avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Indicadores de Produção');  // Verifica se a aba 'Indicadores de Produção' está visível

        cy.salvarAndAvancar(); // Clica no botão para salvar e avançar para a próxima sub-step

    });
    // Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para a próxima sub-step.

});
