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

describe('Adicionar o valor máximo no campo do Termo de Aceite', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
  });

  it('Deve permitir que o usuário insira o valor máximo permitido no campo "Termo de Aceite"', () => {
    // Preenche as informações do Termo de Aceite com o valor máximo
    preencherTermoDeAceiteComValorMaximo();

    // Valida que o sistema permite avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Texto do Edital');  // Verifica se a aba 'Texto do Edital' está visível
  });

  // Função para preencher o campo do Termo de Aceite com o valor máximo
  const preencherTermoDeAceiteComValorMaximo = () => {
    // Navegar até a seção de editar o edital e preencher o campo de "Termo de Aceite"
    acessarSeçãoDePublicarEdital();

    // Preenche o Termo de Aceite com o valor máximo de texto permitido
    preencherTermoDeAceite();
  };

  // Função para acessar a seção de 'Publicar Edital'
  const acessarSeçãoDePublicarEdital = () => {
    cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
    cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
    cy.get('.css-jir0u').click(); // Fecha o menu lateral
  };

  // Função para preencher o campo "Termo de Aceite" com o valor máximo
  const preencherTermoDeAceite = () => {
    cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba 'Termo de Aceite'
    cy.get('.ck-editor__editable', { timeout: 2000 }).should('be.visible'); // Espera o editor carregar

    // Gerar Lorem Ipsum com 5000 caracteres
    const textoTermoDeAceite = gerarLoremIpsum(5000);  // Gera o texto com 5000 caracteres

    cy.get('[data-cy="termoDeAceite"]').then(el => {
      // @ts-ignore
      const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
      editor.setData(textoTermoDeAceite); // Define o conteúdo do Termo de Aceite com o texto gerado
    });

    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar o Termo de Aceite
  };
});
