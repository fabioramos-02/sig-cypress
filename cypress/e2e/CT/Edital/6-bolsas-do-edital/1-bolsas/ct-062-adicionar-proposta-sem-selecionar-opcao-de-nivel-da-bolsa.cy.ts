describe('Adicionar proposta sem selecionar opção de Nível da Bolsa', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Não deve permitir adicionar uma bolsa sem selecionar o Nível da Bolsa', () => {
    const modalidadeBolsa = 1; // Seleciona a Modalidade de Bolsa (exemplo: DCT)
    const nivelBolsa = ""; // Não seleciona Nível de Bolsa

    // Acessa a aba de Bolsas
    cy.get('[data-cy="bolsas-do-edital"]').click(); // Clica na aba Bolsas do Edital
    cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas

    // Clica no botão "Adicionar" para criar uma nova Bolsa
    cy.get('[data-cy="add-button"]').click();

    // Seleciona a Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get(`[data-cy-index="bolsaEditalUnsaved.modalidadeBolsaId-item-${modalidadeBolsa}"]`).click(); // Seleciona a modalidade de bolsa conforme o parâmetro



    // Tenta salvar a Bolsa sem selecionar o Nível de Bolsa
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); // Clica para tentar salvar a Bolsa

    cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar" para tentar salvar as alterações

    // Verifica se o sistema emite uma mensagem de erro, indicando que o Nível da Bolsa é obrigatório
    cy.get('.MuiAlert-message').should('be.visible')
      .and('have.text', 'Nível da Bolsa é obrigatório'); // Verifica se a mensagem de erro está visível
  });

  // Resultado esperado: O sistema não deve aceitar a adição da bolsa, já que o Nível da Bolsa é um campo obrigatório. Além disso, deve sinalizar para o usuário
});
