describe('Validar valor igual ao limite superior permitido em Quantidade de Bolsa por proposta', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir adicionar uma bolsa com quantidade igual ao limite superior permitido', () => {
    const modalidadeBolsa = 1; // Seleciona a Modalidade de Bolsa (exemplo: DCT)
    const nivelBolsa = 0; // Seleciona o Nível de Bolsa (0H - R$ 4.484,00)
    const quantidadeBolsa = true; // Marca a opção de quantidade de bolsas
    const quantidade = "999999999999"; // Quantidade igual ao limite superior permitido

    // Acessa a aba de Bolsas
    cy.get('[data-cy="bolsas-do-edital"]').click(); // Clica na aba Bolsas do Edital
    cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas

    // Clica no botão "Adicionar" para criar uma nova Bolsa
    cy.get('[data-cy="add-button"]').click();

    // Seleciona a Modalidade de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get(`[data-cy-index="bolsaEditalUnsaved.modalidadeBolsaId-item-${modalidadeBolsa}"]`).click(); // Seleciona a modalidade de bolsa conforme o parâmetro

    // Seleciona o Nível de Bolsa
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
    cy.get(`[data-cy-index="bolsaEditalUnsaved.nivelBolsaId-item-${nivelBolsa}"]`).click(); // Seleciona o nível de bolsa conforme o parâmetro

    // Marca a opção de "Quantidade de Bolsa por Proposta" e insere o valor máximo permitido
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').check(); // Marca o checkbox "Possui Quantidade de Bolsa por Proposta"
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').clear().type(quantidade); // Insere o valor igual ao limite permitido

    // Tenta salvar a Bolsa
    cy.get('[data-cy="bolsaEdital-confirmar"]').click(); // Clica para confirmar e tentar salvar a Bolsa

   cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar" para tentar salvar as alterações
    // Resultado esperado: O sistema deve aceitar está bolsa permitindo que o usuário adicione.
    });
});
