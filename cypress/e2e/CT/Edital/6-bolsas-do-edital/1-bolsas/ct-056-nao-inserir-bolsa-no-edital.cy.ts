describe('Validar adição de moeda estrangeira em Rubrica', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Validar se o sistema aceita que o usuário não insira bolsas no Edital.', () => {
       
        cy.get('[data-cy="menu-finalizar"]').click(); // Clica no botão "Finalizar" para tentar avançar sem inserir bolsas

        cy.get('#tableTitle').should('contain.text', 'Publicar Edital'); // Verifica se a tabela de publicação do edital é exibida
    });

    // Resultado esperado: O sistema deve permitir que o usuário finalize o processo sem inserir uma bolsa.
});
