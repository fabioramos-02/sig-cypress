import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Validar tamanho superior ao máximo limite de texto no Descrição do Documento de Proposta.', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Não deve permitir que o usuário adicione uma descrição com mais de 128 caracteres', () => {
    const nomeDocumento = "Teste"; // Nome do documento
    const descricaoDocumento = gerarLoremIpsum(129); // Gera uma descrição com 129 caracteres
    const formatoArquivo = "PDF"; // Formato do arquivo
    const tamanhoArquivo = 50; // Tamanho do arquivo
    const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
    const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

    // Tenta preencher o documento com descrição de 129 caracteres
    cy.adicionarDocumentoDaProposta(nomeDocumento, descricaoDocumento, formatoArquivo, tamanhoArquivo, arquivoDeSubmissaoObrigatorio, uploadDeVariosArqvuios);

    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica no botão de salvar e avançar

    //verifica se tem 128 caracteres
    cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').invoke('val').then((descricao) => {
      expect(String(descricao).length).to.be.lessThan(129); // Verifica se a descrição tem menos de 129 caracteres
    });
  });

  // Resultado esperado: O sistema não deve permitir salvar uma descrição maior que 128 caracteres
});
