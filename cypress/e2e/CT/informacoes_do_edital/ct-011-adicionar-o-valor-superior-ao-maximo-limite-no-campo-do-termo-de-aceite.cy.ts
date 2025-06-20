// Função para gerar texto Lorem Ipsum com N caracteres
const gerarLoremIpsum = (numCaracteres) => {
    const textoBase = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce nibh. Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum augue id magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus. Integer pellentesque quam vel velit. Duis pulvinar. Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam metus. Etiam egestas wisi a erat.";
    let resultado = "";
    // Repete o texto base até atingir o número desejado de caracteres
    while (resultado.length < numCaracteres) {
        resultado += textoBase;
    }
    return resultado.substring(0, numCaracteres);  // Retorna apenas os N primeiros caracteres
};

describe('Adicionar o valor superior ao máximo limite no campo do Termo de Aceite', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Não deve permitir que o usuário insira um valor acima do limite (5001 caracteres)', () => {
        // Preenche as informações do Termo de Aceite com o valor acima do limite
        preencherInformacoesDoEdital(); // Preenche o título do edital
        preencherTermoDeAceiteComValorAcimaDoLimite(); // Preenche o termo de aceite com texto acima do limite

        // Valida que o sistema emite um alerta de erro
        cy.get('.error-message').should('be.visible') // Verifica se a mensagem de erro está visível
          .and('contain.text', 'O texto do Termo de Aceite excede o limite de caracteres permitidos.');  // Verifica a mensagem de erro


    });

    // Função para preencher as informações do edital
    const preencherInformacoesDoEdital = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral

        // Preenche o título do Edital
        cy.get('[data-cy="nome"]').type('Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio', { delay: 0 });
    };

    // Função para preencher o campo do Termo de Aceite com o valor acima do limite
    const preencherTermoDeAceiteComValorAcimaDoLimite = () => {
        cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba 'Termo de Aceite'
        cy.get('.ck-editor__editable', { timeout: 2000 }).should('be.visible'); // Espera o editor carregar

        // Gerar Lorem Ipsum com 5001 caracteres (acima do limite de 5000 caracteres)
        const textoTermoDeAceite = gerarLoremIpsum(5001);  // Gera o texto com 5001 caracteres

        cy.get('[data-cy="termoDeAceite"]').then(el => {
            // @ts-ignore
            const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
            editor.setData(textoTermoDeAceite); // Define o conteúdo do Termo de Aceite com o texto gerado
        });
        cy.wait(1000); // Aguarda 1 segundo para garantir que o editor seja atualizado

        // Clica no menu de salvar ou no botão "Próximo"
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
    };
});
