describe('Selecionar todos os estados na área de abrangência', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Deve permitir que o usuário selecione todos os estados na área de abrangência', () => {
        // Preenche as informações do Edital e seleciona todos os estados na área de abrangência
        preencherInformacoesDoEdital(); // Preenche as informações do Edital
        selecionarTodosOsEstadosNaAbrangencia(); // Seleciona todos os estados

        // Valida que o sistema permite salvar e avançar
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Informações Complementares');  // Verifica se a aba 'Informações Complementares' está visível
    });

    // Função para preencher as informações do edital
    const preencherInformacoesDoEdital = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral

        // Preenche o título do Edital
        cy.get('[data-cy="nome"]').type('Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio', { delay: 0 });
    };

    // Função para selecionar todos os estados na área de abrangência
    const selecionarTodosOsEstadosNaAbrangencia = () => {
        cy.get('[data-cy="abrangencia"]').click(); // Clica na aba Abrangência
        
        cy.get('[data-cy="estado-sao-paulo"]').click(); // Clica no checkbox do estado de São Paulo
        //marcar todos os estados
        cy.wait(1000); // Aguarda 1 segundo para garantir que todos os estados sejam selecionados
        

        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar
    };
});
