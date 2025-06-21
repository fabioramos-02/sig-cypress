import { gerarLoremIpsum } from "../../../../support/utils";

describe('Adicionar o valor superior ao máximo limite no campo do Termo de Aceite.', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário insira um texto com mais de 5000 caracteres', () => {
        const textoTermoDeAceite = gerarLoremIpsum(5001); // Gera o texto com 5001 caracteres
        cy.preencherTermoDeAceite(textoTermoDeAceite); // Preenche o Termo de Aceite com o texto

        cy.salvarAndAvancar(); // Clica no botão "Salvar" e tenta avançar para a próxima seção

        // Verifica se o sistema não permite avançar e exibe uma mensagem de erro
        cy.get('.error-message')
            .should('be.visible')
            .and('contain.text', 'O texto do Termo de Aceite excede o limite de caracteres permitidos.'); // Verifica a mensagem de erro

    });

});
