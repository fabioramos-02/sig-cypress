describe('Adicionar o valor mínimo em campo de duração do projeto', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Realiza login como Gestor (índice 0)
  });

  it('Deve permitir que o usuário insira o valor mínimo permitido para a duração do projeto (1 mês)', () => {
    // Preenche as informações de restrições com o valor mínimo
    preencherDuracaoDoProjetoComValorMinimo();

    // Valida que o sistema permite avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Termo de Aceite');  // Verifica se a aba 'Termo de Aceite' está visível
  });

  // Função para preencher o campo de duração do projeto com o valor mínimo
  const preencherDuracaoDoProjetoComValorMinimo = () => {
    // Navegar até a seção de editar o edital e preencher o campo de duração do projeto
    acessarSeçãoDePublicarEdital();

    // Clica na aba 'Restrições' e preenche a duração do projeto com o valor mínimo
    preencherRestricoesComValorMinimo();
  };

  // Função para acessar a seção de 'Publicar Edital'
  const acessarSeçãoDePublicarEdital = () => {
    cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
    cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
    cy.get('.css-jir0u').click(); // Fecha o menu lateral
  };

  // Função para preencher as restrições com o valor mínimo
  const preencherRestricoesComValorMinimo = () => {
    cy.get('[data-cy="restricoes"]').click(); // Clica na aba Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').clear().type('1'); // Preenche a duração do projeto com o valor mínimo de 1 mês
    cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar as restrições
  };
});
