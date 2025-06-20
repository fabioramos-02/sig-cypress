describe('Título de edital vazio', () => {
    beforeEach(() => {
        // Realiza login no sistema como Gestor
        cy.login(0);
    });

    it('Não deve permitir passar para a próxima etapa sem preencher o título do edital', () => {
        // Início do Teste de Título de Edital Vazio
        preencherInformacoesDoEdital();

        // Tentando salvar o edital sem preencher o título
        salvarEdital();

        // Resultado esperado: O sistema deve apresentar uma mensagem de erro
        // informando que o campo "Título de Edital" não foi preenchido.
        cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'Título de Edital é obrigatório');  // Verifica se a mensagem contém o texto esperado
    });

    // Função para preencher o título do edital
    const preencherInformacoesDoEdital = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral

        // Não preenche o campo de título para simular o erro
        // Não fazemos nada aqui de preenchimento
    };

    // Função para tentar salvar o edital
    const salvarEdital = () => {
        // Tenta clicar no botão "Próximo" ou "Salvar" sem preencher o título
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar" ou "Próximo"
    };
});
