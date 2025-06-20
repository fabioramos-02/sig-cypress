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

        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar o Termo de Aceite
        // Valida que o sistema permite avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Texto do Edital');  // Verifica se a aba 'Texto do Edital' está visível
    });

    const gerarLoremIpsum = (numCaracteres: number) => {
        const textoBase = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit...";
        let resultado = "";
        while (resultado.length < numCaracteres) {
            resultado += textoBase;
        }
        return resultado.substring(0, numCaracteres);  // Retorna apenas os N primeiros caracteres
    };
});
