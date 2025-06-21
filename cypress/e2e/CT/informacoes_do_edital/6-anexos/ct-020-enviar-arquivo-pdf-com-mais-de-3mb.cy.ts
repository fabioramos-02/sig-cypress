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
        cy.enviarArquivo(arquivoPdfMaiorQue3MB); // Envia o arquivo PDF no campo de anexo

        // Valida que o sistema não permite avançar e emite uma mensagem de erro
        cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
            .should('be.visible')
            .and('contain.text', 'Tamanho máximo de anexo é 3 MB'); // Mensagem de erro esperada


        //Resultado esperado: O sistema não deve aceitar o arquivo já que é maior que o valor máximo permitido e sinalizar para o usuário que não é possível salvar e/ou prosseguir para próxima step.
    });
});
