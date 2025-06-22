import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Título de Edital Maior que Limite', () => {
  beforeEach(() => {
    cy.login(0); // Realiza login como Gestor (índice 0)
  });

  // CT 005 - Título de Edital Maior que Limite
  it('Não deve permitir que o usuário insira um título de edital maior que o limite definido', () => {
    const titulo = gerarLoremIpsum(129); // Gera um título com 129 caracteres (maior que o limite)

    // Preenche o título do edital
    cy.preencherIdentificacaoDoEdital(titulo);

    // Verifica se a quantidade de caracteres do título é no máximo 128
    cy.get('[data-cy="nome"]') // Obtém o campo do título do edital
      .invoke('val') // Obtém o valor do campo
      .should((val) => {
        // Valida que o número de caracteres seja menor ou igual a 128
        expect(String(val).length).to.be.lte(128);
      });
  });

  // Resultado esperado: O sistema deve alertar que o título do edital ultrapassa o limite de caracteres e não permitir salvar ou avançar.
});
