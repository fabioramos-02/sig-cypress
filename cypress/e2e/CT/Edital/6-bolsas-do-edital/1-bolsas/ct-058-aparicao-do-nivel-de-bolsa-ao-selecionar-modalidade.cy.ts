describe('Validar Aparição do Nível de Bolsa ao selecionar uma Modalidade', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve exibir o campo Nível de Bolsa à direita ao selecionar uma Modalidade', () => {
    const modalidadeBolsa = 0; // Seleciona a primeira Modalidade de Bolsa (exemplo)
    
    // Acessa a aba de Bolsas
    cy.get('[data-cy="bolsas-do-edital"]').click(); // Clica na aba Bolsas do Edital
    cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas

    // Clica no botão "Adicionar" para criar uma nova Bolsa
    cy.get('[data-cy="add-button"]').click();

    // Seleciona a Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get(`[data-cy-index="bolsaEditalUnsaved.modalidadeBolsaId-item-${modalidadeBolsa}"]`).click(); // Seleciona a modalidade de bolsa conforme o parâmetro

    // Verifica se o campo "Nível de Bolsa" aparece à direita após a seleção da Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').should('be.visible') // Verifica se o campo "Nível de Bolsa" está visível
      .and('have.css', 'float', 'right'); // Verifica se o campo "Nível de Bolsa" está à direita
  });

  // Resultado esperado: O sistema deve reconhecer caso o campo Modalidade da Bolsa seja selecionado, caso sim, ele deve criar um campo novo a direito chamado Nível de bolsa.
});
