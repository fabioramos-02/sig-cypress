describe('Título de edital vazio', () => {
    beforeEach(() => {
        // Realiza login no sistema como Gestor
        cy.login(0);
    });

    it('Não deve permitir passar para a próxima etapa sem preencher o título do edital', () => {
        // Início do Teste de Título de Edital Vazio
        cy.preencherIdentificacaoDoEdital(" "); // Preenche o título do edital com uma string vazia

        

        // Resultado esperado: O sistema deve apresentar uma mensagem de erro
        // informando que o campo "Título de Edital" não foi preenchido.
        cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'Título de Edital é obrigatório');  // Verifica se a mensagem contém o texto esperado
    });


});
