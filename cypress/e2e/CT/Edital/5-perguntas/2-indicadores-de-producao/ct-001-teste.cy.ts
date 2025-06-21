describe('Adicionar um indicador de produção sem selecionar nenhuma opção', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário adicione um indicador de produção sem selecionar nada', () => {
        // Tenta adicionar um Indicador de Produção sem selecionar nenhuma opção
        adicionarIndicadorDeProducao();

        //sistema apresenta a mensagem: Indicador de Produção é obrigatório
        // Verifica se a mensagem de erro aparece quando não há opção selecionada
        cy.get('.MuiAlert-message')
            .should('be.visible')
            .should('contain.text', 'Indicador de Produção é obrigatório');
    });

    // Resultado esperado: O sistema  deve impedir que o usuário consiga adicionar o Indicador de Produção e sinalizar, alertando que ele deve selecionar alguma opção para continuar o processo.
});

// Comando para adicionar um indicador de produção
const adicionarIndicadorDeProducao = () => {
    cy.get('[data-cy="perguntas"]').click(); // Clica na aba de Perguntas
    cy.get('[data-cy="indicadores-de-producao"]').click(); // Clica na aba de Indicadores de Produção

    cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar Indicador de Produção"


    // Clica no botão "Confirmar" para tentar adicionar o indicador de produção
    cy.get('[data-cy="indicadorProducao-confirmar"]').click(); // Clica no botão "Confirmar" para adicionar o indicador de produção


};
