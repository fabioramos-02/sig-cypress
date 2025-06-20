describe('Selecionar apenas um estado na área de abrangência', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Deve permitir que o usuário selecione apenas um estado na área de abrangência', () => {
        // Preenche as informações do Edital e seleciona apenas um estado na área de abrangência
        preencherInformacoesDoEdital(); // Preenche as informações do Edital
        selecionarApenasUmEstadoNaAbrangencia(); // Seleciona apenas um estado

        // Valida que o sistema permite salvar e avançar
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Informações Complementares');  // Verifica se a aba 'Termo de Aceite' está visível
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

    // Função para selecionar apenas um estado na área de abrangência
    const selecionarApenasUmEstadoNaAbrangencia = () => {
        cy.get('[data-cy="abrangencia"]').click(); // Clica na aba Abrangência
        cy.get('[data-cy="estado-acre"]').click(); // Clica no checkbox do estado de Acre
        cy.get('[data-cy="estado-sao-paulo"]').click(); // Clica no checkbox do estado de São Paulo

        // Após selecionar Acre e São Paulo, a seleção de São Paulo deve ser desmarcada automaticamente
        // Verifica que o estado São Paulo foi desmarcado
        cy.get('[data-cy="estado-sao-paulo"]').should('not.be.checked');

        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar


    };
});
