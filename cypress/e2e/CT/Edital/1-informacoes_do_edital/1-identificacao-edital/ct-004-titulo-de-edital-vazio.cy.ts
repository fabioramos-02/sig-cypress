describe('Título de edital vazio', () => {
    beforeEach(() => {
        // Realiza login no sistema como Gestor
        cy.login(0);
    });

    it('Não deve permitir passar para a próxima etapa sem preencher o título do edital', () => {
        // Início do Teste de Título de Edital Vazio
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral
        cy.get('[data-cy="next-button"]').click(); // Tenta avançar para a próxima etapa sem preencher o título do edital
        // informando que o campo "Título de Edital" não foi preenchido.
        cy.get('.error-message').should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'Mínimo de 1 caracteres');  // Verifica se a mensagem contém o texto esperado
            
        // Resultado esperado: O sistema deve alertar que não é possível salvar e nem prosseguir para a próxima a sub-step, sem que o usuário insira um texto no campo Título.
    });


});
