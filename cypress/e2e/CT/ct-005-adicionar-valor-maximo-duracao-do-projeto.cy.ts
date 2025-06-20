describe('Adicionar o valor máximo em campo de duração do projeto', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Deve permitir que o usuário insira o valor máximo permitido para a duração do projeto', () => {
        // Início do Teste de Adicionar o valor máximo em campo de duração do projeto
        preencherRestricoes();


        // Resultado esperado: O sistema deve permitir que o usuário consiga salvar e prosseguir
        cy.get('.css-y8ykzc > .MuiTypography-root').eq(0).should('contain.text', 'Termo de Aceite'); // Verifica se a aba Restrições está visível

    });

    // Função para preencher as Restrições do Edital (Duração do projeto, etc.)
    const preencherRestricoes = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral
        cy.get('[data-cy="restricoes"]').click(); // Clica na aba Restrições
        cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
        cy.get('[data-cy="duracaoProjetoEmMeses"]').type('100'); // Preenche a duração do projeto com o valor máximo permitido
        cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); // Marca a opção "Pesquisador pode submeter várias propostas"
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para salvar as restrições
    }


});
