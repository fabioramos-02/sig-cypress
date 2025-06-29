import 'cypress-iframe';
import 'cypress-real-events';
import 'cypress-file-upload'; // Importa o plugin de upload de arquivos

import './utils'
import { delay } from 'cypress/types/bluebird';

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
Cypress.Commands.add('preencherRubrica', (rubrica, naturezaDespesa, justificativaObrigatoria = false, justificativaGlobal = false, moedaEstrangeira = false, moeda: any) => {

  cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento
  cy.get('[data-cy="rubricas"]').click(); // Clica na aba Rubricas
  cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar uma nova Rubrica

  // Seleciona a Rubrica
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); // Clica no campo de seleção de Tipo de Rubrica
  cy.get(`[data-cy-index="editalRubricaUnsaved.tipoEditalRubrica-item-${rubrica}"]`).click(); // Seleciona a Rubrica conforme o parâmetro

  // Seleciona a Natureza da Despesa
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); // Clica no campo de seleção de Natureza da Despesa
  cy.get(`[data-cy-index="editalRubricaUnsaved.naturezaDespesaId-item-${naturezaDespesa}"]`).click(); // Seleciona a Natureza da Despesa conforme o parâmetro
  cy.wait(500); // Aguarda 500ms para garantir que a Natureza da Despesa foi selecionada

  // Marcar os checkboxes de justificativa, conforme passado nos parâmetros
  if (justificativaObrigatoria) {
    cy.get('[data-cy="editalRubricaUnsaved.temJustificativaObrigatoria"]').should('not.be.disabled').check(); // Marca o checkbox "Justificativa Obrigatória"
  }
  if (justificativaGlobal) {
    cy.get(':nth-child(2) > .sc-cqgMZH').click(); // Clica no campo de seleção de Justificativa Global
  }

  // Marcar Moeda Estrangeira se o parâmetro for verdadeiro
  if (moedaEstrangeira) {
    // Verifica se mais de uma moeda foi passada
    if (Array.isArray(moeda) && moeda.length > 1) {
      // Interrompe o processo e lança um erro
      moeda.forEach((m: string) => {
        cy.get('[data-cy="editalRubricaUnsaved.temMoedaEstrangeira"]').should('not.be.disabled').check(); // Marca o checkbox "Moeda Estrangeira"
        cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').click(); // Clica no campo de seleção de Moeda Estrangeira
        cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').clear().type(m); // Digita o nome da moeda no campo de seleção
        cy.contains(m).click(); // Clica na moeda correspondente
      });
    } else {
      cy.get('[data-cy="editalRubricaUnsaved.temMoedaEstrangeira"]').should('not.be.disabled').check(); // Marca o checkbox "Moeda Estrangeira"

      // Seleciona a moeda estrangeira
      cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').click(); // Clica no campo de seleção de Moeda Estrangeira
      cy.get('[data-cy="editalRubricaUnsaved.moedaEstrangeira"]').clear().type(moeda); // Digita o nome da moeda no campo de seleção
      cy.contains(moeda).click(); // Clica na moeda correspondente
    }

    // Clica para fechar o campo de seleção de Moeda Estrangeira
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

    // Verifica se a moeda estrangeira está vazia caso não tenha sido marcada
    if (!moedaEstrangeira) {
      cy.get(':nth-child(3)').should('have.text', '');  // Verifica se moeda está vazia
    } else {
      // Verifica se o símbolo da Moeda Estrangeira está presente
      cy.get(':nth-child(3)').contains(simbolos[moedaEstrangeira] || moedaEstrangeira);  // Verifica o símbolo da Moeda Estrangeira
    }

    //coluna 4: Justificativa Global
    cy.get(':nth-child(4)').contains(justificativaGlobal ? "Sim" : "Não"); // Verifica se a Justificativa Global foi marcada corretamente
    //coluna 5: Justificativa Obrigatória
    cy.get(':nth-child(5)').contains(justificativaObrigatoria ? "Sim" : "Não"); // Verifica se a Justificativa Obrigatória foi marcada corretamente
  });
});

// Comando para preencher Faixa de Financiamento
Cypress.Commands.add('preencherFaixaDeFinanciamento', (nome: string, valorMinimo: number, valorMaximo: number, observacao: string) => {
  cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento
  cy.get('[data-cy="faixas-de-financiamento"]').click(); // Clica na aba Faixas de Financiamento

  cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento

  // Preenche o nome da Faixa de Financiamento
  cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(nome, { delay: 0 });

  // Preenche o valor mínimo da Faixa de Financiamento
  // Aqui vamos garantir que os valores sejam tratados como inteiros ou com 2 casas decimais
  cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type(valorMinimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim(), { delay: 0 });

  // Preenche o valor máximo da Faixa de Financiamento
  cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type(valorMaximo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '').trim(), { delay: 0 });

  // Preenche a observação da Faixa de Financiamento
  cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(observacao, { delay: 0 });
  // Verifica que o campo observação **não aceita mais de 64 caracteres** (o campo deve bloquear a digitação automaticamente)
  cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]')
    .should('have.value', observacao.substring(0, 64)); // Verifica que o campo tem no máximo 64 caracteres

  // Clica para confirmar e salvar a Faixa de Financiamento
  cy.get('[data-cy="faixaFinanciamento-confirmar"]').click();
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
});

// Comando para validar a tabela de Faixas de Financiamento
// Este comando verifica se a última linha da tabela de Faixas de Financiamento contém os dados inseridos corretamente.
Cypress.Commands.add('validarTabelaFaixasDeFinanciamento', (nomeFaixa, valorMinimo, valorMaximo, observacao) => {
  // Verifica se há ao menos uma faixa salva na tabela
  cy.get('.MuiTableBody-root > .MuiTableRow-root').should('have.length.greaterThan', 0);

  // Converte os valores para remover o símbolo de moeda e validar corretamente
  const valorMinimoConvertido = valorMinimo.toString().replace('R$', '').replace(',', '.').trim(); // Remove R$ e converte vírgula
  const valorMaximoConvertido = valorMaximo.toString().replace('R$', '').replace(',', '.').trim(); // Remove R$ e converte vírgula

  // Espera até que a tabela esteja completamente carregada
  cy.get('.MuiTableBody-root').should('be.visible'); // Garantir que a tabela esteja visível

  // Verifica os dados da última linha da tabela
  cy.get('.MuiTableBody-root > .MuiTableRow-root').last().within(() => {
    // Verifica o nome da faixa
    cy.get(':nth-child(1)').contains(nomeFaixa);

    // Formatação de valores monetários
    const valorMinimoFormatado = `R$ ${parseFloat(valorMinimoConvertido).toLocaleString('pt-BR')}`;
    const valorMaximoFormatado = `R$ ${parseFloat(valorMaximoConvertido).toLocaleString('pt-BR')}`;

    // Verifica se o valor mínimo na tabela está correto
    cy.get(':nth-child(2)').contains(valorMinimoFormatado); // Verifica o formato monetário

    // Verifica se o valor máximo na tabela está correto
    cy.get(':nth-child(3)').contains(valorMaximoFormatado); // Verifica o formato monetário

    // Verifica se a observação está correta
    cy.get(':nth-child(4)').invoke('text').then((text) => {
      expect(text.startsWith(observacao.substring(0, 10))).to.be.true;
    });
  });
});

// Comando para adicionar um Documento da Proposta
// Este comando permite adicionar um Documento da Proposta com os parâmetros especificados.
Cypress.Commands.add('adicionarDocumentoDaProposta', (nomeDocumento: string, descricao: string, formatoArquivo: string, tamanhoArquivo: number, submissaoObrigatoria?: boolean, uploadDeVariosArqvuios?: boolean) => {
  let formatosDeArquivos = ["CSV", "XLS", "ODT", "DOC", "JPEG", "JPG", "PNG", "PDF", "Imagens (PNG, JPEG, JPG)", "Documentos (ODT, DOC, DOCX)", "Planilhas (XLS, XLSX, CSV)"];
  const formatoIndex = formatosDeArquivos.indexOf(formatoArquivo);
  // Clica na aba Documentos e na opção "Documentos da Proposta"
  cy.get('[data-cy="documentos"]').click();
  cy.get('[data-cy="documentos-da-proposta"]').click();

  // Clica para adicionar um novo Documento da Proposta
  cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();

  // Preenche os campos do documento
  cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica para abrir os detalhes do documento
  cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type(nomeDocumento, { delay: 0 }); // Preenche o nome do Documento
  cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').type(descricao, { delay: 0 }); // Preenche a descrição
  cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click(); // Seleciona o formato de arquivo
  cy.get(`[data-cy-index="documentoPropostaEdital.0.formatoArquivo-item-${formatoIndex}"]`).click(); // Seleciona o formato desejado
  cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type(tamanhoArquivo.toString(), { delay: 0 }); // Preenche o tamanho do arquivo

  if (submissaoObrigatoria) {
    cy.get('[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]').check(); // Marca o checkbox de Submissão Obrigatória
  }
  if (uploadDeVariosArqvuios) {
    cy.get('[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]').check(); // Marca o checkbox de Permitir Submissão de Múltiplos Arquivos
  }

  cy.get('.MuiAccordionSummary-root').click();
  cy.get('[data-cy="menu-salvar"]').click(); // Clica no menu de salvar para salvar o Documento da Proposta
});


// Comando para preencher Documentos Pessoais
// Este comando seleciona o documento pessoal baseado no nome passado como parâmetro e se o documento é obrigatório.
Cypress.Commands.add('preencherDocumentosPessoais', (documentos: { nome: string, obrigatorio: boolean }[]) => {
  cy.get('[data-cy="documentos"]').click(); // Clica na aba Documentos
  cy.get('[data-cy="documentos-pessoais"]').click(); // Clica na aba Documentos Pessoais

  // Para cada documento na lista de documentos
  documentos.forEach((documento, index) => {
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); // Clica no botão "Adicionar" Documento Pessoal
    cy.wait(1000); // Adiciona um delay de 1 segundo após adicionar o documento pessoal

    // Clica no campo de seleção de Documento Pessoal com base no índice
    cy.get(`[data-cy="documentoPessoalEdital.${index}.documentoPessoalId"]`).click(); // Clica no campo de seleção

    cy.get(`[data-cy-index="documentoPessoalEdital.${index}.documentoPessoalId-item-${index}"]`).click(); // Seleciona o documento


    // Marca o checkbox "Obrigatório" se o documento for obrigatório
    if (documento.obrigatorio) {
      cy.get(`[data-cy="documentoPessoalEdital.${index}.obrigatorio"]`).check(); // Marca o checkbox de Obrigatório
    }

    cy.wait(500); // Adiciona uma pausa de 500ms entre as ações para evitar problemas com carregamento de elementos
  });
});

// Comando para adicionar um Indicador de Produção
Cypress.Commands.add('adicionarIndicadorDeProducao', (indicador) => {
  const indcadoresDeProducao = [
    "Produção Bibliográfica",
    "Produção Cultural",
    "Produção Técnica ou Tecnológica",
    "Indicador de Produção de Ciências",
    "Teste"
  ];

  // Garante que a aba de Perguntas e Indicadores de Produção está visível antes de interagir
  cy.get('[data-cy="perguntas"]').should('be.visible').click();
  cy.get('[data-cy="indicadores-de-producao"]').should('be.visible').click();

  cy.get('[data-cy="add-button"]').should('be.visible').click();

  // Seleciona o Indicador de Produção
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').should('be.visible').click();

  // Seleciona o indicador com base no nome passado como parâmetro
  const indiceIndicador = indcadoresDeProducao.indexOf(indicador);
  cy.get(`[data-cy-index="indicadorProducaoUnsaved.id-item-${indiceIndicador}"]`)
    .should('be.visible')
    .click();

  // Clica no botão "Confirmar" para tentar adicionar o indicador de produção
  cy.get('[data-cy="indicadorProducao-confirmar"]').should('be.visible').click();

  // Verifica se o sistema permite salvar e avançar para a próxima seção
  cy.get('[data-cy="menu-salvar"]').should('be.visible').click();
});

// Comando para preencher as Bolsas
Cypress.Commands.add('preencherBolsas', (modalidadeBolsa, nivelBolsa, quantidadeBolsa = false, quantidade = 0) => {
  cy.get('[data-cy="bolsas-do-edital"]').click(); // Clica na aba Bolsas do Edital
  cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas

  // Clica no botão "Adicionar" para criar uma nova Bolsa
  cy.get('[data-cy="add-button"]').click();

  // Seleciona a Modalidade de Bolsa correspondente
  cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
  cy.get(`[data-cy-index="bolsaEditalUnsaved.modalidadeBolsaId-item-${modalidadeBolsa}"]`).click(); // Seleciona a modalidade de bolsa conforme o parâmetro

  // Seleciona o Nível de Bolsa correspondente
  cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
  cy.get(`[data-cy-index="bolsaEditalUnsaved.nivelBolsaId-item-${nivelBolsa}"]`).click(); // Seleciona o nível de bolsa conforme o parâmetro

  // Verifica se o campo de Quantidade de Bolsa por Proposta precisa ser preenchido
  if (quantidadeBolsa) {
    cy.get('[data-cy="bolsaEditalUnsaved.possuiQuantidadeBolsaPorProposta"]').check(); // Marca o checkbox "Possui Quantidade de Bolsa por Proposta"
    cy.get('[data-cy="bolsaEditalUnsaved.quantidadeBolsaPorProposta"]').clear().type(quantidade, {delay: 0 }); // Preenche a quantidade de bolsas por proposta
  }

  // Clica em confirmar para salvar a Bolsa
  cy.get('[data-cy="bolsaEdital-confirmar"]').click();

  // Aguarda 1 segundo entre as interações (ajuste conforme necessário)
  cy.wait(1000); // Adiciona uma pausa de 1 segundo entre as interações
});

// Comando para preencher a Abrangência com múltiplos estados e municípios
Cypress.Commands.add('preencherAbrangenciaDaSubmissao', () => {
  cy.get('[data-cy="abrangencia"]').click(); // Clica no campo "Abrangência"
  cy.get('[data-cy="abrangencia-adicionar"]').click(); // Clica no botão para adicionar abrangência

  cy.get('[data-cy="abrangencia.0.estadoId"]').click(); // Clica no campo "Estado" pega o index 0
  cy.get(`[data-cy-index="abrangencia.0.estadoId-item-0"]`).click(); // Seleciona o estado conforme o parâmetro

  cy.get('[data-cy="abrangencia.0.abrangenciaMunicipio"]').click(); // Clica no campo "Abrangência Município"
  cy.wait(1000); // Aguarda 1 segundo para garantir que o campo esteja pronto
  cy.get('[data-cy-index="abrangencia.0.abrangenciaMunicipio-item-0"]').click(); // Seleciona o município conforme o parâmetro
});

// Comando para validar a tabela de Bolsas
// Este comando verifica se a última linha da tabela de Bolsas contém os dados inseridos corretamente.
Cypress.Commands.add('validarTabelaBolsas', (modalidadeBolsa, nivelBolsa, quantidade) => {
  cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
  
  cy.get('.MuiTableBody-root > .MuiTableRow-root').should('have.length.greaterThan', 0);  // Verifica que há ao menos uma linha na tabela

  cy.get('.MuiTableBody-root > .MuiTableRow-root').last().within(() => {
    // Coluna 1: Modalidade de Bolsa
    cy.get(':nth-child(1)').contains(modalidadeBolsa);  // Verifica se a Modalidade de Bolsa está presente no conteúdo

    // Coluna 2: Nível de Bolsa
    cy.get(':nth-child(2)').contains(nivelBolsa);  // Verifica se o Nível de Bolsa está presente no conteúdo

    // Coluna 3: Quantidade de Bolsa por Proposta (não visível, já que o campo não foi selecionado)
    cy.get(':nth-child(3)').contains(quantidade);  // Verifica se a quantidade de bolsa está vazia, pois não foi selecionada
  });
});