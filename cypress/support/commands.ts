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
    cy.get('[data-cy="chamadaUnsaved.horaInicio"]').type(horarioInicio); // Preenche o horário de início

    // Preenche a data de término e horário
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(dataFim); // Preenche a data de término
    cy.get('[data-cy="chamadaUnsaved.horaTermino"]').type(horarioFim); // Preenche o horário de término

    // Clica no botão para confirmar os dados
    cy.get('[data-cy="chamada-confirmar"]').click();
});