describe('Preencher título do edital', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.typelogin('[URL do sistema]', '[E-mail do usuário]', '[Senha do usuário]');
  });

  it('Deve permitir preencher o título do edital e avançar para a próxima seção', () => {
    // Início do Teste de Preenchimento do Título do Edital
    preencherInformacoesDoEdital();

    // Finalizar o processo de criação do edital
    salvarEdital();

    // Resultado esperado: O sistema deve permitir que o usuário consiga salvar o estado atual do preenchimento do edital.
  });

  // Função para preencher o título do edital
  const preencherInformacoesDoEdital = () => {
    cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
    cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
    cy.get('.css-jir0u').click(); // Fecha o menu lateral

    // Preenchendo o título do Edital conforme o formato especificado
    cy.get('[data-cy="nome"]').type('Teste', { delay: 0 });

   
  };

  // Função para finalizar o processo de criação do Edital
  const salvarEdital = () => {
    // Finaliza o processo de criação do Edital
    cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
  };
});
