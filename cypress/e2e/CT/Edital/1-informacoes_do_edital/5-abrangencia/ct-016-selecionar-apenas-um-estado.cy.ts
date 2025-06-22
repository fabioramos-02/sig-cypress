describe('Selecionar estados específicos na área de abrangência', () => {
    beforeEach(() => {
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Deve permitir que o usuário selecione os estados Acre', () => {
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações do edital
        cy.selecionarEstadosNaAbrangencia(['acre']); // Seleciona Acre

        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Informações Complementares'); // Verifica se a aba 'Informações Complementares' está visível
    });

    // Resultado esperado: O sistema deve permitir que o usuário consiga salvar e prosseguir para próxima sub-step.
});
