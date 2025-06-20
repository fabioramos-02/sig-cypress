describe(' Selecionar todos os estados na área de abrangência.', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário selecione todos os estados na área de abrangência', () => {
        // Preenche as informações do Edital e seleciona todos os estados na área de abrangência
        cy.selecionarEstadosNaAbrangencia("todos"); // Seleciona todos os estados

        // Valida que o sistema permite salvar e avançar para a próxima etapa
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Informações Complementares'); // Verifica se a aba 'Informações Complementares' está visível
    });

    // Resultado esperado: O sistema deve permitir que o usuário consiga salvar e prosseguir para a próxima sub-step.
});
