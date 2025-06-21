describe('Enviar arquivo pdf de até 3 MB', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário envie um arquivo PDF de até 3 MB', () => {
        const arquivoPdf = 'teste.pdf'; // Caminho absoluto do arquivo PDF até 3MB

        // Função para enviar o arquivo PDF
        cy.enviarArquivo(arquivoPdf); // Envia o arquivo PDF no campo de anexo
        cy.salvarAndAvancar(); // Clica no botão "Salvar" e tenta avançar para a próxima seção

        
        // Valida que o sistema permite avançar para a próxima seção após o upload do arquivo
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Período de Submissão');  // Verifica se a aba 'Período de Submissão' está visível
    });

    // Resultado esperado: O sistema deve aceitar corretamente o arquivo e permitir que o usuário salve e/ou prossiga para a próxima step.
});