describe('Validar o campo Tamanho Máximo de Arquivo sem estar preenchido.', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário adicione um documento sem preencher o tamanho de arquivo', () => {
        const nomeDocumento = "Teste"; // Nome do documento
        const formatoArquivo = "PDF"; // Formato do arquivo
        const descricaoDocumento = "Descrição do Documento"; // Descrição do documento
        const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
        const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

        // Tenta preencher o documento sem preencher o tamanho do arquivo
        let formatosDeArquivos = ["CSV", "XLS", "ODT", "DOC", "JPEG", "JPG", "PNG", "PDF", "Imagens (PNG, JPEG, JPG)", "Documentos (ODT, DOC, DOCX)", "Planilhas (XLS, XLSX, CSV)"];
        const formatoIndex = formatosDeArquivos.indexOf(formatoArquivo);
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
        cy.get(`[data-cy-index="documentoPropostaEdital.0.formatoArquivo-item-${formatoIndex}"]`).click(); // Seleciona o formato desejado

        if (arquivoDeSubmissaoObrigatorio) {
            cy.get('[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]').check(); // Marca o checkbox de Submissão Obrigatória
        }
        if (uploadDeVariosArqvuios) {
            cy.get('[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]').check(); // Marca o checkbox de Permitir Submissão de Múltiplos Arquivos
        }
        cy.get('.MuiAccordionSummary-root').click();
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar para salvar o Documento da Proposta
        // Chama o comando para salvar e avançar
        cy.get('[data-cy="menu-salvar"]').click();
        // Verifica se o sistema exibe erro e não permite avançar sem preencher o tamanho do arquivo
        cy.get('.MuiAlert-message').should('contain.text', 'O tamanho do arquivo deve ser um número inteiro.'); // Verifica a mensagem de erro



    });

    // Resultado esperado: O sistema deve alertar que o campo "Tamanho do Arquivo" O tamanho do arquivo deve ser um número inteiro.
});
