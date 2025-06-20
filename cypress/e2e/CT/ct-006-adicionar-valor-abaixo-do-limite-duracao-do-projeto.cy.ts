describe('Adicionar o valor abaixo do inferior limite em campo de duração do projeto', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Não deve permitir que o usuário insira um valor abaixo do limite (0 meses)', () => {
        // Preenche as informações de restrições
        preencherDuracaoDoProjetoComValorInvalido();

        // Valida que o sistema emite um alerta de erro
        cy.get('.error-message').should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'O valor deve ser maior ou igual a 1'); // Verifica se a mensagem contém o texto esperado

        // Verifica que o campo de duração do projeto ainda está vazio ou com valor inválido
        cy.get('[data-cy="duracaoProjetoEmMeses"]').should('have.value', '0');  // Garante que o campo não tenha sido preenchido com valor inválido
    });

    // Função para preencher o campo de duração do projeto com um valor inválido (0 meses)
    const preencherDuracaoDoProjetoComValorInvalido = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral

        cy.get('[data-cy="restricoes"]').click(); // Clica na aba Restrições
        cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
        cy.get('[data-cy="duracaoProjetoEmMeses"]').clear().type('0'); // Preenche a duração do projeto com o valor abaixo do limite (0 meses)
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar as restrições
    };
});
