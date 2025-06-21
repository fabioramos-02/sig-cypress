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
    const observacaoValida = "Lorem Ipsum Valid"; // Observação válida com menos de 64 caracteres
    const observacaoInvalida = gerarLoremIpsum(65); // Observação com 65 caracteres, excedendo o limite

    // Tenta preencher a faixa de financiamento com uma observação válida
    cy.preencherFaixaDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacaoValida);
    // Verifica que a observação foi salva corretamente
    cy.validarTabelaFaixasDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacaoValida);

    // Tenta preencher a faixa de financiamento com a observação inválida (mais de 64 caracteres)
    cy.preencherFaixaDeFinanciamento(nomeFaixa, valorMinimo, valorMaximo, observacaoInvalida);

    // Verifica que o campo observação **não aceita mais de 64 caracteres** (o campo deve bloquear a digitação automaticamente)
    cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]')
      .should('have.value', observacaoInvalida.substring(0, 64)); // Verifica que o campo tem no máximo 64 caracteres

    // Verifica se o sistema bloqueia a inserção e exibe um alerta de erro
    cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
      .and('contain.text', 'A observação não pode ter mais de 64 caracteres.'); // Verifica se a mensagem contém o texto esperado

    // Verifica que o sistema não permite salvar a faixa
    cy.get('[data-cy="menu-salvar"]').should('be.disabled'); // O botão de salvar deve estar desabilitado
  });

  // Resultado esperado: O sistema deve emitir um alerta de erro e bloquear a inserção da observação caso o limite de 64 caracteres seja ultrapassado.
});
