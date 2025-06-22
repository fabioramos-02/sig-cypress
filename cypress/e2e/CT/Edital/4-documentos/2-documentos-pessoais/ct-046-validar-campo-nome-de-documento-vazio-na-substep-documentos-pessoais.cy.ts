describe('Validar campo Nome de Documento vazio na substep Documentos Pessoais', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
    cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve impedir salvar um documento pessoal vazio', () => {

    cy.get('[data-cy="documentos"]').click(); // Clica na aba "Documentos"
    cy.get('[data-cy="documentos-pessoais"]').click(); // Clica na substep "Documentos Pessoais"

    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); // Clica no botão para adicionar um novo documento pessoal
    
    cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar" para tentar salvar o documento pessoal
    // Verifica se o sistema não permite salvar e exibe a mensagem de erro
    cy.get('.MuiAlert-message').should('be.visible') // Verifica se a mensagem de erro está visível
      .and('have.text', 'Documentos Pessoais não pode ser vazio.'); // Verifica se a mensagem é exatamente igual ao texto esperado
    //sistema emite a mensagem: documentoPessoalEdital.0.Documentos Pessoais não pode ser vazio.
  });

  // Resultado esperado: O sistema deve impedir salvar o documento e exibir a mensagem de erro.
});
