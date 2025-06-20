describe('Adicionar o valor acima do superior limite em campo de duração do projeto', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Não deve permitir que o usuário insira um valor acima do limite (101 meses)', () => {
        // Preenche as informações de restrições com o valor acima do limite
        preencherDuracaoDoProjetoComValorAcimaDoLimite();

        // Valida que o sistema emite um alerta de erro
        cy.get('.error-message')
            .should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'O valor deve ser menor ou igual a 100'); // Verifica se a mensagem contém o texto esperado

        // Verifica que o campo de duração do projeto ainda está com o valor inválido
        cy.get('[data-cy="duracaoProjetoEmMeses"]')
            .should('have.value', '101');  // Garante que o valor máximo (101) não foi aceito

        // Resultado esperado: O sistema deve informar que o valor deve ser menor ou igual a 100
    });

    // Função para preencher o campo de duração do projeto com um valor inválido (acima do limite)
    const preencherDuracaoDoProjetoComValorAcimaDoLimite = () => {
        // Navegar até a seção de editar o edital e preencher o campo de duração do projeto
        acessarSeçãoDePublicarEdital();

        // Clica na aba 'Restrições' e preenche a duração do projeto com valor acima do limite
        preencherRestricoesComValorInvalido();
    };

    // Função para acessar a seção de 'Publicar Edital'
    const acessarSeçãoDePublicarEdital = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral
    };

    // Função para preencher as restrições com um valor inválido
    const preencherRestricoesComValorInvalido = () => {
        cy.get('[data-cy="restricoes"]').click(); // Clica na aba Restrições
        cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
        cy.get('[data-cy="duracaoProjetoEmMeses"]').clear().type('101'); // Preenche a duração do projeto com o valor acima do limite (101 meses)
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar as restrições
    };
});
