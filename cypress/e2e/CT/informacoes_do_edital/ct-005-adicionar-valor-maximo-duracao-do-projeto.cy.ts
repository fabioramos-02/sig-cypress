describe('Adicionar o valor máximo em campo de duração do projeto', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.login(0); // Login como Gestor (índice 0)
    cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
  });

  it('Deve permitir que o usuário insira o valor máximo permitido para a duração do projeto', () => {
    // Preenche as informações de restrições
    cy.preencherDuracaoDoProjeto(100); // Preenche a duração do projeto com 6 meses
    // preencherDuracaoMaximaDoProjeto();

    // Valida que o sistema permite avançar para a próxima seção
    cy.get('.css-y8ykzc > .MuiTypography-root')
      .eq(0)
      .should('contain.text', 'Termo de Aceite');  // Verifica se a aba 'Termo de Aceite' está visível
  });

  // Função para preencher o campo de Duração do Projeto com o valor máximo
  const preencherDuracaoMaximaDoProjeto = () => {
    // Navegação até a seção de 'Publicar Edital'
    acessarSeçãoDePublicarEdital();

    // Preenche as restrições do edital
    preencherRestricoes();
  };

  // Função para navegar até a seção de 'Publicar Edital'
  const acessarSeçãoDePublicarEdital = () => {
    cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
    cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
    cy.get('.css-jir0u').click(); // Fecha o menu lateral
  };

  // Função para preencher a duração máxima do projeto e outras restrições
  const preencherRestricoes = () => {
    cy.get('[data-cy="restricoes"]').click(); // Clica na aba 'Restrições'
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção 'Definir a duração do projeto em meses'

    // Preenche a duração do projeto com o valor máximo permitido
    cy.get('[data-cy="duracaoProjetoEmMeses"]').clear().type('100'); // Preenche com o valor máximo de 100 meses

    // Marca a opção para permitir que o pesquisador submeta várias propostas
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // Clica no botão "Próximo" para salvar as restrições e avançar
    cy.get('[data-cy="next-button"]').click();
  };
});
// Resultado esperado: O sistema deve permitir que o usuário insira o valor máximo permitido para a duração do projeto