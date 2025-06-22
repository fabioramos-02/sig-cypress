describe('Não selecionar nenhum estado na área de abrangência', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir salvar ou prosseguir sem selecionar nenhum estado', () => {
        // Preenche as informações do Edital e não seleciona nenhum estado na área de abrangência
        cy.selecionarEstadosNaAbrangencia([]); // Não seleciona nenhum estado

        // Valida que o sistema emite um alerta de erro
        cy.get('.error-message')
            .should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'Você deve escolher pelo menos um estado'); // Verifica a mensagem de erro

        // Verifica que o sistema não permite salvar e avançar
        cy.get('[data-cy="next-button"]').should('be.disabled'); // Verifica que o botão "Próximo" está desabilitado

        //Resultado esperado: O sistema deve alertar que o usuário necessita escolher ao menos um estado e não permitir que ele consiga salvar e/ou prosseguir para próxima sub-step.
    });
});
