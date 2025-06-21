describe('Enviar arquivo jpg com menos de 3 MB de tamanho', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário envie um arquivo JPG', () => {
        const arquivoJpg = 'arquivo-jpg-menor-que-3mb.jpg'; // Caminho do arquivo JPG com menos de 3 MB

        // Função para enviar o arquivo JPG
        cy.enviarArquivo(arquivoJpg); // Envia o arquivo JPG no campo de anexo

        // Valida que o sistema não permite avançar e emite uma mensagem de erro
        cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
            .should('be.visible')
            .and('contain.text', 'O anexo deve ser PDF'); // Mensagem de erro esperada

        // Resultado esperado: O sistema não deve aceitar o arquivo JPG e sinalizar para o usuário que não é possível salvar e/ou prosseguir para a próxima etapa.
    });
});
