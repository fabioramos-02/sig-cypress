describe('Validar o campo Tamanho Máximo de Arquivo com valor máximo em Documento de Proposta.', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário adicione um documento com o tamanho máximo de arquivo', () => {
    const nomeDocumento = "Teste"; // Nome do documento
    const formatoArquivo = "PDF"; // Formato do arquivo
    const tamanhoArquivo = 50; // Tamanho do arquivo (máximo permitido)
    const descricaoDocumento = "Descrição do Documento"; // Descrição do documento
    const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
    const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

    // Tenta preencher o documento com tamanho máximo de arquivo
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

    // Verifica se o sistema permite salvar e avançar com o tamanho de arquivo máximo permitido
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Documentos'); // Verifica se a aba 'Documentos' está visível
  });

  // Resultado esperado: O sistema deve permitir salvar e avançar para o próximo passo com o tamanho máximo de arquivo
});
