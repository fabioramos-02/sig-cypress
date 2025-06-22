declare namespace Cypress {
    interface Chainable {
        typelogin: (url: string, email: string, password: string) => void
        login: (tipoUsuario?: number) => void; //  'login' aceita um parâmetro opcional 'tipoUsuario' com valor padrão 0
        preencherIdentificacaoDoEdital: (titulo: string) => void;
        salvarAndAvancar: () => void;
        preencherDuracaoDoProjeto: (valor: number) => void;
        preencherTermoDeAceite: (texto: string) => void;
        preencherTextoDoEdital: (texto: string) => void;
        selecionarEstadosNaAbrangencia: (estados: string[] | string) => void;
        enviarArquivo: (caminhoArquivo: string) => void;
        preencherPeriodoSubmissao: (dataInicio: any, horarioInicio: any, dataFim: any, horarioFim: any) => void;
        preencherPrograma: (programa: any, naturezaDespesa: any, valor: any) => void;
        preencherRubrica: (rubrica: any, naturezaDespesa: any, justificativaObrigatoria?: boolean, justificativaGlobal?: boolean, moedaEstrangeira?: boolean, moeda?: any) => void;
        validarTabelaRubrica: (rubrica: any, naturezaDespesa: any, moedaEstrangeira: any, justificativaGlobal: any, justificativaObrigatoria: any) => void;
        preencherFaixaDeFinanciamento: (nome: string, valorMinimo: number, valorMaximo: number, observacao: string) => void;
        validarTabelaFaixasDeFinanciamento: (nomeFaixa: string, valorMinimo: number, valorMaximo: number, observacao: string) => void;
        adicionarDocumentoDaProposta: (nomeDocumento: string, descricao: string, formatoArquivo: string, tamanhoArquivo: number, submissaoObrigatoria?: boolean, uploadDeVariosArqvuios?: boolean) => void;
        preencherDocumentosPessoais:  (documentos: { nome: string, obrigatorio: boolean }[]) => void;
        adicionarIndicadorDeProducao: (indicador: any) => void;
        preencherBolsas: (modalidadeBolsa: any, nivelBolsa: any, quantidadeBolsa ?: boolean, quantidade?: any) => void;
        preencherAbrangenciaDaSubmissao: () => void;
        validarTabelaBolsas: (modalidadeBolsa: any, nivelBolsa: any, quantidade: any) => void;
    }

}
