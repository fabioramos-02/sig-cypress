describe('Validar tentativa de adicionar bolsa sem preencher os campos obrigatórios', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir adicionar uma bolsa sem preencher os campos obrigatórios', () => {
        cy.get('[data-cy="bolsas-do-edital"]').click(); // Clica na aba Bolsas do Edital
        cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas
        cy.get('[data-cy="add-button"]').click(); // Clica no botão para adicionar uma nova bolsa
        cy.get('[data-cy="bolsaEdital-confirmar"]').click(); // Clica no botão Confirmar para tentar adicionar a bolsa sem preencher os campos obrigatórios
        cy.get('[data-cy="menu-finalizar"]').click(); // Clica no botão "Finalizar" para tentar avançar sem inserir bolsas

        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar" para tentar salvar as alterações


        // Verifica se o sistema exibe uma mensagem de erro
        cy.get('.MuiAlert-message').should('be.visible')
            .and('have.text', 'A Modalidade e Nível da Bolsa são obrigatórios.'); // Verifica se a mensagem de erro está visível
        // Resultado esperado: O sistema não deve permitir que o usuário consiga adicionar está bolsa que não contém os dados obrigatórios preenchidos.
    });
});
