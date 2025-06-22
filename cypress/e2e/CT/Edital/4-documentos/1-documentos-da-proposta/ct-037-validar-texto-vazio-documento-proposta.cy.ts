import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Validar se o sistema aceita um texto vazio em Nome do Documento de Proposta.', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir o envio de um Documento com Nome vazio', () => {
        const formatoArquivo = "PDF"; // Formato do arquivo
        const tamanhoArquivo = 50; // Tamanho do arquivo
        const arquivoDeSubmissaoObrigatorio = false; // Submissão não obrigatória
        const uploadDeVariosArqvuios = false; // Não permite múltiplos arquivos

        let formatosDeArquivos = ["CSV", "XLS", "ODT", "DOC", "JPEG", "JPG", "PNG", "PDF", "Imagens (PNG, JPEG, JPG)", "Documentos (ODT, DOC, DOCX)", "Planilhas (XLS, XLSX, CSV)"];
        const formatoIndex = formatosDeArquivos.indexOf(formatoArquivo);
        // Clica na aba Documentos e na opção "Documentos da Proposta"
        cy.get('[data-cy="documentos"]').click();
        cy.get('[data-cy="documentos-da-proposta"]').click();

        // Clica para adicionar um novo Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();

        // Preenche os campos do documento
        cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica para abrir os detalhes do documento
        cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click(); // Seleciona o formato de arquivo
        cy.get(`[data-cy-index="documentoPropostaEdital.0.formatoArquivo-item-${formatoIndex}"]`).click(); // Seleciona o formato desejado
        cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type(tamanhoArquivo.toString(), { delay: 0 }); // Preenche o tamanho do arquivo

        if (arquivoDeSubmissaoObrigatorio) {
            cy.get('[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]').check(); // Marca o checkbox de Submissão Obrigatória
        }
        if (uploadDeVariosArqvuios) {
            cy.get('[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]').check(); // Marca o checkbox de Permitir Submissão de Múltiplos Arquivos
        }

        cy.get('.MuiAccordionSummary-root').click();
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar para salvar o Documento da Proposta

        // Verifica se o sistema emite exatamente a mensagem O nome deve ter entre 1 e 128 caracteres.
        cy.get('.MuiAlert-message').should('have.text', "O nome deve ter entre 1 e 128 caracteres.");
    });
    // Resultado esperado: O sistema não deve permitir que o usuário salve e/ou prossiga para o próximo sub-step e deve apresentar uma mensagem informando que O nome deve ter entre 1 e 128 caracteres.
});
