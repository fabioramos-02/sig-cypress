describe('Enviar arquivo pdf com mais de 3 MB', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário envie um arquivo PDF maior que 3 MB', () => {
        const arquivoPdfMaiorQue3MB = 'arquivo-maior-que-3mb.pdf'; // Caminho do arquivo PDF com mais de 3 MB

        // Função para enviar o arquivo PDF
        cy.enviarArquivoPdf(arquivoPdfMaiorQue3MB); // Envia o arquivo PDF no campo de anexo

        // Valida que o sistema não permite avançar e emite uma mensagem de erro
        cy.get('.error-message') // Verifica se a mensagem de erro está visível
            .should('be.visible')
            .and('contain.text', 'O arquivo excede o limite de 3 MB.'); // Mensagem de erro esperada

        // Verifica que o sistema não permitiu salvar ou avançar para a próxima seção
        cy.get('[data-cy="next-button"]').should('not.be.enabled'); // Verifica se o botão "Próximo" está desabilitado
    });
});
