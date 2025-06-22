describe('Validar Documento de Proposta sem Formato de Arquivo.', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário adicione um documento sem selecionar formato de arquivo', () => {
        const nomeDocumento = "Teste"; // Nome do documento
        const formatoArquivo = "PDF"; // Não seleciona formato de arquivo
        const tamanhoArquivo = 50; // Tamanho do arquivo
        const descricaoDocumento = "Descrição do Documento"; // Descrição do documento
        const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
        const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

        // Tenta preencher o documento sem selecionar o formato de arquivo
        // Clica na aba Documentos e na opção "Documentos da Proposta"
        cy.get('[data-cy="documentos"]').click();
        cy.get('[data-cy="documentos-da-proposta"]').click();

        // Clica para adicionar um novo Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();

        // Preenche os campos do documento
        cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica para abrir os detalhes do documento
        cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type(nomeDocumento, { delay: 0 }); // Preenche o nome do Documento
        cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').type(descricaoDocumento, { delay: 0 }); // Preenche a descrição
        cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click(); // Seleciona o formato de arquivo
        cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type(tamanhoArquivo.toString(), { delay: 0 }); // Preenche o tamanho do arquivo

        if (arquivoDeSubmissaoObrigatorio) {
            cy.get('[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]').check(); // Marca o checkbox de Submissão Obrigatória
        }
        if (uploadDeVariosArqvuios) {
            cy.get('[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]').check(); // Marca o checkbox de Permitir Submissão de Múltiplos Arquivos
        }

        cy.get('.MuiAccordionSummary-root').click();
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar para salvar o Documento da Proposta

        // Chama o comando para salvar e avançar
        cy.salvarAndAvancar();
        // Verifica se o sistema exibe erro e não permite avançar sem o formato de arquivo
        cy.get('.MuiAlert-message').should('contain.text', 'O formato tem que ser: XLS, JPEG, PDF ou DOC'); // Verifica a mensagem de erro

        // Verifica se o sistema não avançou para a próxima seção
        cy.get('.edt4uwm23').should('contain.text', 'Documentos da Proposta'); // Verifica se ainda está na aba 'Documentos da Proposta'
    });

    // Resultado esperado: O sistema deve alertar que o formato de arquivo é obrigatório e não permitir avançar
});
