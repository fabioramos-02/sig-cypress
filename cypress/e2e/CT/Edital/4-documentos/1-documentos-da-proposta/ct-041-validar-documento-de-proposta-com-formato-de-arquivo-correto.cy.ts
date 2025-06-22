describe('Validar Documento de Proposta com Formato de Arquivo correto.', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário adicione um documento com formato de arquivo PDF', () => {
    const nomeDocumento = "Teste"; // Nome do documento
    const formatoArquivo = "PDF"; // Formato do arquivo
    const tamanhoArquivo = 50; // Tamanho do arquivo
    const descricaoDocumento = "Descrição do Documento"; // Descrição do documento
    const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
    const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

    // Tenta preencher o documento com formato PDF
    cy.adicionarDocumentoDaProposta(nomeDocumento, descricaoDocumento, formatoArquivo, tamanhoArquivo, arquivoDeSubmissaoObrigatorio, uploadDeVariosArqvuios);

    cy.salvarAndAvancar(); // Tenta salvar e avançar para o próximo passo


    // Verifica se o sistema permite salvar e avançar com o formato de arquivo selecionado
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Documentos');  // Verifica se a aba 'Documentos' está visível
  });

  // Resultado esperado: O sistema deve permitir salvar e avançar para o próximo passo com o formato de arquivo correto
});
