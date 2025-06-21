
describe('Validar tamanho mínimo de texto no Documento de Proposta', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário adicione um nome de documento com 1 caractere', () => {
    const nomeDocumento = "T"; // Nome de documento com 1 caractere (mínimo permitido)
    const formatoArquivo = "PDF"; // Formato do arquivo
    const tamanhoArquivo = 50; // Tamanho do arquivo
    const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
    const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

    // Tenta preencher o documento com o nome com 1 caractere
    cy.adicionarDocumentoDaProposta(nomeDocumento, "Descrição do Documento", formatoArquivo, tamanhoArquivo, arquivoDeSubmissaoObrigatorio, uploadDeVariosArqvuios);


  });


  //sistema emite a seguinte mensagem: documentoPropostaEdital.0.O tamanho do arquivo deve ser menor que 10.
  // Resultado esperado: O sistema deve permitir que o usuário salve e prossiga normalmente com o Documento de Proposta.
});
