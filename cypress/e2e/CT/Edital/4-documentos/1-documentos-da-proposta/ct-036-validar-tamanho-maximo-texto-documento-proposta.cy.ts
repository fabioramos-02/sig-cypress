import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Validar se o sistema aceita um texto com a quantidade de caracteres maior ao valor superior limite permitido em Nome do Documento de Proposta.', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário adicione um nome de documento com 129 caracteres', () => {
    const nomeDocumento = gerarLoremIpsum(129); // Gera um nome de documento com 129 caracteres
    const formatoArquivo = "PDF"; // Formato do arquivo
    const tamanhoArquivo = 50; // Tamanho do arquivo
    const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
    const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

    // Tenta preencher o documento com o nome com 128 caracteres
    cy.adicionarDocumentoDaProposta(nomeDocumento, "Descrição do Documento", formatoArquivo, tamanhoArquivo, arquivoDeSubmissaoObrigatorio, uploadDeVariosArqvuios);

    // Valida que o nome do documento foi salvo corretamente na tabela
    cy.get('.MuiTableBody-root > .MuiTableRow-root').last().within(() => {
      cy.get(':nth-child(1)').contains(nomeDocumento); // Verifica se o nome do documento está correto
    });

    // Verifica que o sistema permite salvar e avançar
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Documentos');  // Verifica se a aba 'Documentos' está visível
  });

  // Resultado esperado:O sistema não deve permitir que o Nome Documento da Proposta tenha mais de 128 caracteres
});
