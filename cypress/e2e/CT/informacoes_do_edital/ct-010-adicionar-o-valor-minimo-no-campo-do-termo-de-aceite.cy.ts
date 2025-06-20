// Função para gerar texto Lorem Ipsum mínimo (apenas alguns caracteres)
const gerarLoremIpsumMinimo = (numCaracteres) => {
    const textoBase = "Lorem ipsum dolor sit amet.";
    let resultado = "";
    while (resultado.length < numCaracteres) {
        resultado += textoBase;
    }
    return resultado.substring(0, numCaracteres);  // Retorna o texto com o número desejado de caracteres
};

describe('Adicionar o valor mínimo no campo do Termo de Aceite', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Deve permitir que o usuário insira o valor mínimo permitido no campo "Termo de Aceite"', () => {
        // Preenche as informações do Termo de Aceite com o valor mínimo
        preencherTermoDeAceiteComValorMinimo();

        // Valida que o sistema permite avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Texto do Edital');  // Verifica se a aba 'Texto do Edital' está visível
    });

    // Função para preencher o campo do Termo de Aceite com o valor mínimo
    const preencherTermoDeAceiteComValorMinimo = () => {
        // Navegar até a seção de editar o edital e preencher o campo de "Termo de Aceite"
        acessarSeçãoDePublicarEdital();

        // Preenche o Termo de Aceite com o valor mínimo de texto permitido
        preencherTermoDeAceite();
    };

    // Função para acessar a seção de 'Publicar Edital'
    const acessarSeçãoDePublicarEdital = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral
        // Preenche o título do Edital
        cy.get('[data-cy="nome"]').type('Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio', { delay: 0 });
    };

    // Função para preencher o campo "Termo de Aceite" com o valor mínimo
    const preencherTermoDeAceite = () => {
        cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba 'Termo de Aceite'
        cy.get('.ck-editor__editable', { timeout: 2000 }).should('be.visible'); // Espera o editor carregar

        // Gerar Lorem Ipsum com valor mínimo 1 caracteres)
        const textoTermoDeAceite = gerarLoremIpsumMinimo(1);  // Gera o texto com 1 caractere (valor mínimo)

        cy.get('[data-cy="termoDeAceite"]').then(el => {
            // @ts-ignore
            const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
            editor.setData(textoTermoDeAceite); // Define o conteúdo do Termo de Aceite com o texto mínimo
        });

        cy.wait(1000); // Aguarda 1 segundo para garantir que o editor seja atualizado
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar o Termo de Aceite
    };
});
