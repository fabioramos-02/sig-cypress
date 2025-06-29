import { gerarLoremIpsum } from "../../../../../support/utils";

describe('Nome da Faixa de Financiamento maior que o permitido', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve bloquear a inserção de um nome da faixa com mais de 16 caracteres', () => {
    const nomeFaixa = gerarLoremIpsum(17); // Gera um nome de faixa com 17 caracteres, excedendo o limite permitido
    const valorMinimo = 400.00; // Valor mínimo
    const valorMaximo = 4000.00; // Valor máximo
    const observacao = "O Teste foi executado e deve dar erro"; // Observação

    // Tenta preencher a faixa de financiamento com nome inválido (mais de 16 caracteres)
    cy.preencherFaixaDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacao);


  });

  // Resultado esperado: O sistema deve emitir um alerta de erro e bloquear a inserção do nome da faixa caso o limite de 16 caracteres seja ultrapassado.
});
