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
        validarTabelaRubrica: (rubrica: any, naturezaDespesa: any, moedaEstrangeira: any,  justificativaGlobal: any, justificativaObrigatoria: any) => void;
    }
}
