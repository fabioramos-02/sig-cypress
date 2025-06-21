import 'cypress-iframe';
import 'cypress-real-events';
import 'cypress-file-upload'; // Importa o plugin de upload de arquivos

import './utils'

// cypress/support/commands.ts
Cypress.Commands.add('typelogin', () => {
  // Carregar o arquivo JSON de credenciais
  cy.fixture('credenciais_sistema.json').then((credenciais) => {
    const { login, senha } = credenciais.credenciais[0]; // Usando o primeiro conjunto de credenciais (grupo1_gestor@sig.com)

    // Acessar o sistema com a URL e as credenciais
    cy.visit(credenciais.url_sistema);
    cy.get('#login').type(login);
    cy.get('#senha').type(senha);
    cy.get('.css-1wz47u4 > .MuiButton-root').click(); // Botão Acessar da página de login
  });

});

Cypress.Commands.add('login', (tipoUsuario = 0) => {
  // Carregar o arquivo JSON de credenciais
  cy.fixture('credenciais_sistema.json').then((credenciais) => {
    const { login, senha } = credenciais.credenciais[tipoUsuario]; // Usando o índice para selecionar as credenciais

    // Acessar o sistema com a URL e as credenciais
    cy.visit(credenciais.url_sistema);
    cy.get('#login').type(login);
    cy.get('#senha').type(senha);
    cy.get('.css-1wz47u4 > .MuiButton-root').click(); // Botão Acessar da página de login
  });
});

Cypress.Commands.add('preencherIdentificacaoDoEdital', (titulo: string) => {
  cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
  cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
  cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
  cy.get('.css-jir0u').click(); // Fecha o menu lateral

  // Preenchendo o título do Edital conforme o formato especificado
  cy.get('[data-cy="nome"]').type(titulo, { delay: 0 });
});

// Comando para clicar no botão Salvar e avançar
Cypress.Commands.add('salvarAndAvancar', () => {
  // Aguarda 1 segundo para garantir que o editor foi atualizado
  cy.wait(1000);
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar
  cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar
});

// Comando para preencher a duração do projeto com um valor específico
Cypress.Commands.add('preencherDuracaoDoProjeto', (valor: number) => {
  cy.get('[data-cy="restricoes"]').click(); // Clica na aba 'Restrições'
  cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
  cy.get('[data-cy="duracaoProjetoEmMeses"]').clear().type(valor.toString()); // Preenche com o valor passado como parâmetro
  cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar a duração do projeto
});


// Comando para preencher o campo "Termo de Aceite" com um texto específico
// Este comando preenche o campo "Termo de Aceite" com o texto fornecido e garante que o editor CKEditor seja atualizado corretamente.
Cypress.Commands.add('preencherTermoDeAceite', (texto: string) => {
  cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba 'Termo de Aceite'
  cy.get('.ck-editor__editable', { timeout: 2000 }).should('be.visible'); // Espera o editor carregar

  // Preenche o campo "Termo de Aceite" com o texto fornecido, mas sem o último caractere
  const textoSemUltimoCaracter = texto.slice(0, -1);
  cy.get('[data-cy="termoDeAceite"]').then(el => {
    // @ts-ignore
    const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
    editor.setData(textoSemUltimoCaracter); // Define o conteúdo do Termo de Aceite com o texto fornecido (sem o último caractere)
  });

  // Agora digita o último caractere com realType para simular a digitação real
  cy.get('[data-cy="termoDeAceite"]').click(); // Clica na aba 'Termo de Aceite'
  cy.get('.ck-editor__main > .ck').realType(texto.charAt(texto.length - 1), { delay: 0 }); // Digita o último caractere
});

// Comando para preencher o campo "Texto do Edital" 
// Este comando preenche o campo "Texto do Edital" com o texto fornecido e garante que o editor CKEditor seja atualizado corretamente.
Cypress.Commands.add('preencherTextoDoEdital', (texto: string) => {
  cy.get('[data-cy="texto-do-edital"]').click(); // Clica na aba 'Texto do Edital'
  cy.get('.ck-editor__editable', { timeout: 2000 }).should('be.visible'); // Espera o editor carregar

  // Preenche o campo "Texto do Edital" com o texto fornecido, mas sem o último caractere
  const textoSemUltimoCaracter = texto.slice(0, -1);
  cy.get('[data-cy="texto"]').then(el => {
    // @ts-ignore
    const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
    editor.setData(textoSemUltimoCaracter); // Define o conteúdo do Texto do Edital com o texto fornecido (sem o último caractere)
  });

  // Agora digita o último caractere com realType para simular a digitação real
  cy.get('[data-cy="texto"]').click(); // Clica na aba 'Texto do Edital'
  cy.get('.ck-editor__main > .ck').realType(texto.charAt(texto.length - 1), { delay: 0 }); // Digita o último caractere
});

// Comando para selecionar estados na área de abrangência
// Este comando permite selecionar estados específicos ou todos os estados na área de abrangência do edital.
Cypress.Commands.add('selecionarEstadosNaAbrangencia', (estados: string[] | string) => {
  cy.get('[data-cy="abrangencia"]').click(); // Clica na aba Abrangência
  cy.get('[data-cy="estado-sao-paulo"]').click(); // Clica no checkbox para desmarcar o estado de São Paulo que já está selecionado

  if (Array.isArray(estados)) {
    // Se passar um array de estados, seleciona cada estado individualmente
    estados.forEach((estado) => {
      cy.get(`[data-cy="estado-${estado}"]`).click(); // Clica no checkbox de cada estado
    });
  } else if (estados === 'todos') {
    // Se passar a string 'todos', seleciona todos os estados
    cy.get('[data-cy="estado-todos"]').click(); // Clica na opção "Todos"
  }

  // Após selecionar os estados, clica no botão de salvar
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar
  cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para avançar
});

// Comando para enviar um arquivo
Cypress.Commands.add('enviarArquivo', (arquivo: string) => {
  cy.get('[data-cy="anexos"]').click(); // Clica na aba Anexos
  cy.get('[data-cy="editalAnexo-procure"]').selectFile(arquivo); // Anexa o arquivo PDF ao campo de upload
  cy.wait(1000); // Aguarda 1 segundo para garantir que o upload seja concluído
});

// Comando reutilizável para preencher o Período de Submissão
Cypress.Commands.add('preencherPeriodoSubmissao', (dataInicio, horarioInicio, dataFim, horarioFim) => {
  cy.get('[data-cy="cronograma"]').click(); // Clica na aba Cronograma
  cy.get('[data-cy="periodo-de-submissao"]').click(); // Clica na aba Período de Submissão
  cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar um novo Período de Submissão

  // Preenche a data de início e horário
  cy.get('[data-cy="chamadaUnsaved.inicio"]').type(dataInicio); // Preenche a data de início
  cy.get('[data-cy="chamadaUnsaved.inicio"]').type(horarioInicio); // Preenche a data de início


  // Preenche a data de término e horário
  cy.get('[data-cy="chamadaUnsaved.termino"]').type(dataFim); // Preenche a data de término
  cy.get('[data-cy="chamadaUnsaved.termino"]').type(horarioFim); // Preenche a data de término


  // Clica no botão para confirmar os dados
  cy.get('[data-cy="chamada-confirmar"]').click();
});

// Comando para preencher Programa
Cypress.Commands.add('preencherPrograma', (programa = ' ', naturezaDespesa = ' ', valor = ' ') => {
  cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento
  cy.get('[data-cy="programa"]').click(); // Clica em Programa para selecionar um programa

  // Seleciona o programa
  if (programa != " ") {
    cy.get('[data-cy="programaId"]').click(); // Clica no campo de seleção de Programa
    cy.get(`[data-cy-index="programaId-item-${programa}"]`).click(); // Seleciona o programa conforme o parâmetro
  }


  // Clica para adicionar uma nova Natureza da Despesa
  cy.get('[data-cy="add-natureza-da-despesa"]').click(); // Clica para adicionar uma nova Natureza da Despesa
  if (naturezaDespesa != ' ') {
    // Seleciona a Natureza da Despesa
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.naturezaDespesaId"]').click(); // Seleciona a Natureza da Despesa
    cy.get(`[data-cy-index="naturezaDespesaEditalUnsaved.naturezaDespesaId-item-${naturezaDespesa}"]`).click(); // Seleciona a natureza da despesa conforme o parâmetro
    cy.wait(500); // Aguarda 1 segundo para garantir que a natureza da despesa foi selecionada
  }

  if (valor != ' ') {
    // Preenche o valor da despesa
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.valor"]').clear().type(valor); // Preenche o valor da despesa
  }
  // Clica em confirmar para salvar a Natureza da Despesa
  cy.get('[data-cy="naturezaDespesaEdital-confirmar"]').click();

  // Seleciona o programa e clica em salvar
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
});

// Comando para preencher Rubricas
// Comando para preencher Rubricas com Moeda Estrangeira, Justificativa, etc.
Cypress.Commands.add('preencherRubrica', (rubrica, naturezaDespesa, justificativaObrigatoria = false, justificativaGlobal = false, moedaEstrangeira = false, moeda = '') => {
  
  cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento
  cy.get('[data-cy="rubricas"]').click(); // Clica na aba Rubricas
  cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar uma nova Rubrica

  // Seleciona a Rubrica
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); // Clica no campo de seleção de Tipo de Rubrica
  cy.get(`[data-cy-index="editalRubricaUnsaved.tipoEditalRubrica-item-${rubrica}"]`).click(); // Seleciona a Rubrica conforme o parâmetro

  // Seleciona a Natureza da Despesa
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); // Clica no campo de seleção de Natureza da Despesa
  cy.get(`[data-cy-index="editalRubricaUnsaved.naturezaDespesaId-item-${naturezaDespesa}"]`).click(); // Seleciona a Natureza da Despesa conforme o parâmetro
  cy.wait(500); // Aguarda 1 segundo para garantir que a natureza da despesa foi selecionada

  // Marcar os checkboxes de justificativa, conforme passado nos parâmetros
  if (justificativaObrigatoria) {
    cy.get('[data-cy="editalRubricaUnsaved.temJustificativaObrigatoria"]').should('not.be.disabled').check(); // Marca o checkbox "Justificativa Obrigatória"
  }
  if (justificativaGlobal) {
    cy.get(':nth-child(2) > .sc-cqgMZH').click(); // Clica no campo de seleção de Justificativa Global
  }

  // Marcar Moeda Estrangeira se o parâmetro for verdadeiro
  if (moedaEstrangeira) {
    cy.get('[data-cy="editalRubricaUnsaved.temMoedaEstrangeira"]').should('not.be.disabled').check(); // Marca o checkbox "Moeda Estrangeira"

    // Seleciona a moeda estrangeira
    cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').click(); // Clica no campo de seleção de Moeda Estrangeira
    cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').clear().type(moeda); // Digita o nome da moeda no campo de seleção
    cy.contains(moeda).click(); // Clica na moeda correspondente

    //clica para fechar o campo de seleção de Moeda Estrangeira
    cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').click(); // Clica no campo de seleção de Moeda Estrangeira
  }
  // Confirma e salva a Rubrica
  cy.get('[data-cy="editalRubrica-confirmar"]').click(); // Clica no botão "Confirmar" para salvar a Rubrica
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
});

// Comando para validar a tabela de Rubricas
// Este comando verifica se a última linha da tabela de Rubricas contém os dados inseridos corretamente.
Cypress.Commands.add('validarTabelaRubrica', (rubrica, naturezaDespesa, moedaEstrangeira, justificativaGlobal, justificativaObrigatoria) => {
  let simbolos = {
    'Dólar': 'US$', 
    'Euro': '€', 
    'Libra': '£', 
    'Iene': '¥'
  };

  cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
  cy.get('.MuiTableBody-root > .MuiTableRow-root').should('have.length.greaterThan', 0);  // Verifica que há ao menos uma linha na tabela

  cy.get('.MuiTableBody-root > .MuiTableRow-root').last().within(() => {
    //coluna 1: Rubrica
    cy.get(':nth-child(1)').contains(rubrica);  // Verifica se o nome da Rubrica está presente no conteúdo
    //coluna 2: Natureza da Despesa
    cy.get(':nth-child(2)').contains(naturezaDespesa);  // Verifica se o nome da Natureza da Despesa está presente no conteúdo
    //coluna 3: Moeda Estrangeira
    // Verifica se o símbolo da Moeda Estrangeira está presente
    cy.get(':nth-child(3)').contains(simbolos[moedaEstrangeira] || moedaEstrangeira);  // Verifica o símbolo da Moeda Estrangeira
    //coluna 4: Justificativa Global
    cy.get(':nth-child(4)').contains(justificativaGlobal ? "Sim" : "Não"); // Verifica se a Justificativa Global foi marcada corretamente
    //coluna 5: Justificativa Obrigatória
    cy.get(':nth-child(5)').contains(justificativaObrigatoria ? "Sim" : "Não"); // Verifica se a Justificativa Obrigatória foi marcada corretamente
  });
});