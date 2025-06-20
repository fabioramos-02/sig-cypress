declare namespace Cypress {
    interface Chainable {
        typelogin: (url: string, email: string, password: string) => void
        //  'login' aceita um parâmetro opcional 'tipoUsuario' com valor padrão 0
        login: (tipoUsuario?: number) => void;
        preencherIdentificacaoDoEdital: (titulo: string) => void;
        salvarAndAvancar: () => void;
        preencherDuracaoDoProjeto: (valor: number) => void;

    }
}
