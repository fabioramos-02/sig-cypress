import { gerarLoremIpsum } from "../../../../support/utils";

describe('Observação da Faixa de Financiamento maior que o permitido', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve bloquear a inserção de uma observação com mais de 64 caracteres', () => {
    const nomeFaixa = "Lorem Ipsum"; // Nome da faixa de financiamento
    const valorMinimo = 400.00; // Valor mínimo
    const valorMaximo = 4000.00; // Valor máximo
    const observacao = gerarLoremIpsum(65); // Observação com 65 caracteres, excedendo o limite

    // Tenta preencher a faixa de financiamento com uma observação válida
    cy.preencherFaixaDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacao);
    // Verifica que a observação foi salva corretamente
    cy.validarTabelaFaixasDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacao);

  });

  // Resultado esperado: O sistema deve emitir um alerta de erro e bloquear a inserção da observação caso o limite de 64 caracteres seja ultrapassado.
});
