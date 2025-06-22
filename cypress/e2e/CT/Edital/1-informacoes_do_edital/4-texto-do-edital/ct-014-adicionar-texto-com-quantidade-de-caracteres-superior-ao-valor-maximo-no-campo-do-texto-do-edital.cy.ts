import { gerarLoremIpsum } from "../../../../../support/utils"; // Utilizando a função utilitária para gerar Lorem Ipsum

describe('Adicionar texto com quantidade de caracteres superior ao valor máximo no campo do Texto do Edital', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Não deve permitir que o usuário insira um valor superior ao limite de caracteres (5001 caracteres)', () => {
        const textoTextoDoEdital = gerarLoremIpsum(5001); // Gera o texto com 5001 caracteres
        cy.preencherTextoDoEdital(textoTextoDoEdital); // Preenche o Texto do Edital com o texto de 5001 caracteres


        
        // Clica no botão "Salvar" e tenta avançar para a próxima seção
        cy.salvarAndAvancar();

        // Verifica se o sistema emite uma mensagem de erro
        cy.get('.error-message')
            .should('be.visible') // Verifica se a mensagem de erro está visível
            .and('contain.text', 'O texto do Edital excede o limite de caracteres permitidos.');  // Verifica se a mensagem contém o texto esperado

    });
});
