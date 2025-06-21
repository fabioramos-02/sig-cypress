describe('Definir Período de Submissão', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário defina o Período de Submissão', () => {
        // Define o Período de Submissão com as datas e horários fornecidos
        const dataInicio = '20/06/2025';
        const horarioInicio = '00:00:00';
        const dataFim = '22/06/2025';
        const horarioFim = '00:00:00';

        cy.preencherPeriodoSubmissao(dataInicio, horarioInicio, dataFim, horarioFim); // Preenche o Período de Submissão

        // Valida que o sistema permite salvar e avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Texto do Edital');  // Verifica se a aba 'Texto do Edital' está visível
    });
    // Resultado esperado: O sistema deve permitir salvar e prosseguir normalmente para a próxima sub-step.

});
