import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Adicionar o valor máximo no campo do Termo de Aceite', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário insira o valor máximo permitido no campo "Termo de Aceite"', () => {
        const textoTermoDeAceite = gerarLoremIpsum(5000); // Gera o texto com 5000 caracteres
        cy.preencherTermoDeAceite(textoTermoDeAceite); // Preenche o Termo de Aceite com o texto máximo
    
        cy.salvarAndAvancar(); // Clica no botão "Salvar" e tenta avançar para a próxima seção
        // Resultado esperado: O sistema deve permitir que o usuário consiga salvar e prosseguir para a substep Texto do Edital.
    });

});
