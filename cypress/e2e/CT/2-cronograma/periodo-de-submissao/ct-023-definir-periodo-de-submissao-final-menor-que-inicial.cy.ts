describe('Definir Período de Submissão Final menor que inicial', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário defina o Período de Submissão com data final menor que a data inicial', () => {
        // Define o Período de Submissão com as datas e horários fornecidos
        const dataInicio = '20/06/2025';
        const horarioInicio = '00:00:00';
        const dataFim = '19/06/2025'; // Data final menor que a inicial
        const horarioFim = '00:00:00';

        // Preenche o Período de Submissão
        cy.preencherPeriodoSubmissao(dataInicio, horarioInicio, dataFim, horarioFim);

        // Valida que o sistema exibe uma mensagem de erro
        cy.get('.MuiAlert-message').should('be.visible')
            .and('contain.text', 'Data final não pode ser anterior à data inicial');  // A mensagem pode variar dependendo da implementação do sistema
    });

    // Resultado esperado: O sistema deve mostrar um erro ao usuário e não permitir que o usuário salve e prossiga para próxima sub-step.
});
