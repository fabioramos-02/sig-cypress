import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Validar tamanho máximo de texto no Descrição do Documento de Proposta.', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário adicione uma descrição com 128 caracteres', () => {
        const nomeDocumento = "Teste"; // Nome do documento
        const descricaoDocumento = gerarLoremIpsum(128); // Gera uma descrição com 128 caracteres
        const formatoArquivo = "PDF"; // Formato do arquivo
        const tamanhoArquivo = 50; // Tamanho do arquivo
        const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
        const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

        // Tenta preencher o documento com descrição de 128 caracteres
        cy.adicionarDocumentoDaProposta(nomeDocumento, descricaoDocumento, formatoArquivo, tamanhoArquivo, arquivoDeSubmissaoObrigatorio, uploadDeVariosArqvuios);
        // Verifica se existe uma mensagem de alerta exibida pelo sistema
        cy.salvarAndAvancar();

        // Verifica se o sistema permite salvar e avançar
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Documentos');  // Verifica se a aba 'Documentos' está visível
    });

    // Resultado esperado: O sistema deve permitir salvar e avançar para o próximo passo
});
