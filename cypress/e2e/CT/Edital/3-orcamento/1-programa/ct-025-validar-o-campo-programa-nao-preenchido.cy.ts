describe('Validar o campo Programa não preenchido', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário salve sem selecionar um Programa', () => {

        cy.preencherPrograma(undefined, undefined, undefined); // Tenta preencher o Programa sem selecionar nada

        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar

        // Valida que o sistema não permite salvar e emite uma mensagem de erro
        cy.get('.MuiAlert-message')
            .should('be.visible') // Verifica se a mensagem de erro está visível
            .should('contain.text', 'O campo Programa é obrigatório.'); // Mensagem de erro esperada
        //sistema emite a seguinte mensagem: naturezaDespesaEdital.0.O valor deve ser menor que 999.999.999,99.naturezaDespesaEdital.0.O valor deve ser maior que 0,00.
    });

    // Resultado esperado: O sistema deve alertar que o usuário deve selecionar uma opção de Programa antes de prosseguir.
});
