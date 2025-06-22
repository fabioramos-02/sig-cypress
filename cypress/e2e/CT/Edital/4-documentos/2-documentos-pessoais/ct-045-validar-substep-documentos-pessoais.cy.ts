describe('Validar o substep Documentos Pessoais', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir selecionar documentos pessoais', () => {
    const documentos = [
      { nome: "CPF", obrigatorio: false }
    ]; // Lista de documentos a serem adicionados com a obrigatoriedade

    // Chama o comando reutilizável para preencher os documentos pessoais
    cy.preencherDocumentosPessoais(documentos);


    cy.salvarAndAvancar(); // Clica no botão "Salvar" e tenta avançar para a próxima seção

    // Verifica que o sistema permite salvar e avançar para o próximo sub-step
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Descrição do Projeto');  // Verifica se a aba 'Descrição do Projeto' está visível
  });

  // Resultado esperado: O sistema  deve permitir que o usuário salve e/ou prossiga para o próximo step.
});
