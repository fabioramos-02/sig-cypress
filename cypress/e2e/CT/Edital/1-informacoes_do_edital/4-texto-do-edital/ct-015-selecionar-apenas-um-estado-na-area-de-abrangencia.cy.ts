import { gerarLoremIpsum } from "../../../../../support/utils"; // Utilizando a função utilitária para gerar Lorem Ipsum

describe('Adicionar texto com quantidade de caracteres igual ao valor mínimo no campo do Texto do Edital', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário insira o valor mínimo permitido no campo "Texto do Edital"', () => {
        const textoTextoDoEdital = gerarLoremIpsum(0); // Gera o texto com 0 caractere
        cy.preencherTextoDoEdital(textoTextoDoEdital); // Preenche o Texto do Edital com o texto de 1 caractere

        // Clica no botão "Salvar" e tenta avançar para a próxima seção
        cy.salvarAndAvancar();

        // Verifica se o sistema permite avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Abrangência'); // Verifica se a aba 'Abrangência' está visível
    });
});
