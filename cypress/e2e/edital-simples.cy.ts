import { getCurrentDateTime } from '../helpers/date.helper';

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    // Realiza login no sistema antes de cada teste
    cy.typelogin('[URL do sistema]', '[E-mail do usuário]', '[Senha do usuário]');
  });

  it.only('Realiza login no sistema e cria um edital simples', () => {
    // Início do Teste de Edição Simples (E.S.)
    preencherInformacoesDoEdital();
    preencherRestricoes();
    preencherCronograma();
    preencherOrcamento();

    // Finalizar o processo de criação do edital
    salvarEFinalizarEdital();

    // Resultado esperado: O Edital deve ser salvo com sucesso e o usuário deve ser redirecionado para a página de Editais.
  });

  // Função para preencher as informações do Edital (Título, Código, etc.)
  const preencherInformacoesDoEdital = () => {
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();
    cy.get('.css-jir0u').click(); // Fechar menu lateral

    // Preenchendo o título do Edital conforme o formato especificado
    cy.get('[data-cy="nome"]').type(
      'Grupo-01 E.S. 006/2025 fabio-ramos Edital Simples', { delay: 0 }
    );
  };

  // Função para preencher as Restrições do Edital (Duração do projeto, etc.)
  const preencherRestricoes = () => {
    cy.get('[data-cy="restricoes"]').click(); // Clica na aba Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); // Preenche a duração do projeto em meses
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); // Marca a opção "Pesquisador pode submeter várias propostas"
  };

  // Função para preencher as informações de Cronograma
  const preencherCronograma = () => {
    cy.get('[data-cy="cronograma"]').click(); // Clica na aba Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); // Clica na aba Período de Submissão
    cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); // Preenche a data de início
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addYears: 1 })); // Preenche a data de término
    cy.get('[data-cy="chamada-confirmar"]').click(); // Confirma as datas do período de submissão
  };

  // Função para preencher as informações de Orçamento
  const preencherOrcamento = () => {
    cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento
    cy.get('[data-cy="programa"]').click(); // Clica em Programa para selecionar um programa
    cy.get('[data-cy="add-natureza-da-despesa"]').click(); // Clica para adicionar uma nova Natureza da Despesa
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.naturezaDespesaId"]').click(); // Seleciona a Natureza da Despesa
    cy.get('[data-cy-index="naturezaDespesaEditalUnsaved.naturezaDespesaId-item-0"]').click(); // Seleciona o primeiro item
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.valor"]').type('100000'); // Preenche o valor da despesa
    cy.get('[data-cy="naturezaDespesaEdital-confirmar"]').click(); // Clica em confirmar para salvar a Natureza da Despesa

    // Seleciona o programa e clica em salvar
    cy.get('[data-cy="programaId"]').click();
    cy.get('[data-cy-index="programaId-item-0"]').click();
    cy.get('[data-cy="menu-salvar"]').click(); // Clica em salvar
  };

  // Função para finalizar o processo de criação do Edital
  const salvarEFinalizarEdital = () => {
    cy.get('[data-cy="menu-finalizar"]').click(); // Finaliza o processo
  };
});
