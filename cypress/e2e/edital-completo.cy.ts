import { getCurrentDateTime } from '../helpers/date.helper';

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.typelogin('[URL do sistema]', '[E-mail do usuário]', '[Senha do usuário]');
    });

    it.only('Realiza login no sistema e cria um edital completo', () => {
        // Início do Teste de Edição Completo (E.C.)
        preencherInformacoesDoEdital();
        // preencherRestricoes();
        // preencherTermoDeAceite();
        // preencherTextoDoEdital();
        // preencherAbrangencia();
        // preencherInformacoesComplementares();
        // preencherCronograma();
        // preencherOrcamento();
        // preencherRubricas();
        preencherFaixasDeFinanciamento();
        // preencherDocumentos();
        // preencherPerguntas();
        // preencherBolsas();

        // Finalizar o processo de criação do edital
        // salvarEFinalizarEdital();

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
            'Grupo-01 E.C. 005/2025 fabio-ramos Edital Completo', { delay: 0 }
        );
    };

    // Função para preencher as Restrições do Edital (Duração do projeto, etc.)
    const preencherRestricoes = () => {
        cy.get('[data-cy="restricoes"]').click(); // Clica na aba Restrições
        cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); // Marca a opção "Definir a duração do projeto em meses"
        cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); // Preenche a duração do projeto em meses
        cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); // Marca a opção "Pesquisador pode submeter várias propostas"
    };

    // Função para preencher o Termo de Aceite do Edital
    const preencherTermoDeAceite = () => {
        cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba Termo de Aceite
        cy.get('.ck-editor__editable', { timeout: 5000 }).should('be.visible'); // Espera o editor carregar
        cy.get('.ck-editor__editable').clear().realType('Termo de Aceite do Edital Completo do grupo Fabio Ramos', { delay: 0 }); // Insere o texto com realType
    };

    // Função para preencher o Texto do Edital
    const preencherTextoDoEdital = () => {
        cy.get('[data-cy="texto-do-edital"]').click(); // Clica na aba Texto do Edital
        cy.get('.ck-editor__editable', { timeout: 5000 }).should('be.visible'); // Espera o editor carregar
        cy.get('.ck-editor__editable').clear().realType('Texto do Edital Completo do grupo Fabio Ramos', { delay: 0 }); // Insere o texto com realType
    };

    // Função para preencher as Abrangências (selecionando estados)
    const preencherAbrangencia = () => {
        cy.get('[data-cy="abrangencia"]').click(); // Clica na aba Abrangência
        cy.get('[data-cy="estado-todos"]').click(); // Seleciona todos os estados

    };

    // Função para preencher as Informações Complementares (perguntas)
    const preencherInformacoesComplementares = () => {
        cy.get('[data-cy="informacoes-complementares"]').click(); // Clica na aba Informações Complementares
        cy.get('[data-cy="perguntaInfoId"]').click(); // Clica no campo de seleção de Pergunta
        cy.get(`[data-cy-index="perguntaInfoId-item-1"]`).click(); // Seleciona a Pergunta correspondente ao índice
        cy.wait(2000); // Espera 2 segundos antes de clicar
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); // Clica no botão "Adicionar" para adicionar uma nova Pergunta

        cy.get('[data-cy="perguntaInfoId"]').click(); // Clica no campo de seleção de Pergunta
        cy.get(`[data-cy-index="perguntaInfoId-item-2"]`).click(); // Seleciona a Pergunta correspondente ao índice
        cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click(); // Clica no botão "Adicionar" para adicionar uma nova Pergunta
    };

    // Função para preencher o Cronograma de Submissão
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
        cy.get('[data-cy="programaId"]').click(); // Clica no campo de seleção de Programa
        cy.get('[data-cy-index="programaId-item-0"]').click(); // Seleciona o primeiro Programa da lista de Programas
        cy.get('[data-cy="menu-salvar"]').click(); // Clica em salvar
    };

    const preencherRubricas = () => {
        cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento

        cy.get('[data-cy="rubricas"]').click(); // Clica na aba Rubricas
        cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar uma nova Rubrica

        cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click(); // Clica no campo de seleção de Tipo de Rubrica
        cy.get('[data-cy-index="editalRubricaUnsaved.tipoEditalRubrica-item-0"]').click(); // Seleciona o primeiro Tipo de Rubrica
        cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click(); // Clica no campo de seleção de Natureza da Despesa
        cy.get('[data-cy-index="editalRubricaUnsaved.naturezaDespesaId-item-0"]').click(); // Seleciona a primeira Natureza da Despesa

        cy.get('[data-cy="editalRubricaUnsaved.temJustificativaGlobal"]').check(); // Marca a opção "Tem Justificativa Global"
        cy.get('[data-cy="editalRubrica-confirmar"]').click(); // Clica em confirmar para salvar a Rubrica

    };

    const preencherFaixasDeFinanciamento = () => {
        cy.get('[data-cy="orcamento"]').click(); // Clica na aba Orçamento
        cy.get('[data-cy="faixas-de-financiamento"]').click(); // Clica na aba Faixas de Financiamento

        let valorMinimo = 100000; // Valor inicial para o valor mínimo
        let valorMaximo = 500000; // Valor inicial para o valor máximo
        const faixas = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5'];

        // Loop para adicionar 5 faixas de financiamento
        for (let i = 1; i <= 5; i++) {
            cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar uma nova Faixa de Financiamento

            cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(faixas[i-1], { delay: 1 }); // Preenche o nome da Faixa de Financiamento

            // Preenche o valor mínimo apenas para a primeira faixa
            if (i === 1) {
                cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]').type(valorMinimo.toString(), { delay: 0 }); // Preenche o valor mínimo da Faixa de Financiamento
            }

            cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]').type(valorMaximo.toString(), { delay: 0 }); // Preenche o valor máximo da Faixa de Financiamento
            cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]').type(`Observação sobre a Faixa de Financiamento ${i}`, { delay: 0 }); // Preenche a observação da Faixa de Financiamento

            cy.get('[data-cy="faixaFinanciamento-confirmar"]').click(); // Clica em confirmar para salvar a Faixa de Financiamento

            // Atualiza os valores para a próxima faixa
            valorMinimo = valorMaximo + 1; // O valor mínimo da próxima faixa será o valor máximo da faixa atual + 1
            valorMaximo = valorMinimo + 400000; // O valor máximo será o valor mínimo atual + um valor fixo
        }
    };


    // Função para preencher os Documentos da Proposta
    const preencherDocumentos = () => {
        cy.get('[data-cy="documentos-da-proposta"]').click(); // Clica na aba Documentos da Proposta
        cy.get('[data-cy="add-documento"]').click(); // Clica para adicionar um novo Documento da Proposta
        for (let i = 0; i < 2; i++) {
            cy.get('[data-cy="documento-input"]').type(`Documento da Proposta ${i + 1}`, { delay: 0 });
        }

        cy.get('[data-cy="documentos-pessoais"]').click(); // Clica na aba Documentos Pessoais
        for (let i = 0; i < 5; i++) {
            cy.get('[data-cy="add-documento-pessoal"]').click(); // Clica no botão "Adicionar" para adicionar documentos pessoais
            cy.get('[data-cy="documento-pessoal-input"]').type(`Documento Pessoal ${i + 1}`, { delay: 0 });
        }
    };

    // Função para preencher as Perguntas de Descrição do Projeto e Indicadores de Produção
    const preencherPerguntas = () => {
        cy.get('[data-cy="perguntas"]').click(); // Clica na aba Perguntas
        cy.get('[data-cy="indicadores-de-producao"]').click(); // Clica na aba Indicadores de Produção
        for (let i = 0; i < 3; i++) {
            cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" Indicador de Produção
            cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); // Clica no campo de seleção de Indicador de Produção
            cy.get('[data-cy-index="indicadorProducaoUnsaved.id-item-0"]').click(); // Seleciona o primeiro Indicador de Produção
            cy.get('[data-cy="indicadorProducao-confirmar"]').click(); // Clica em confirmar
        }
    };

    // Função para preencher as Bolsas do Edital
    const preencherBolsas = () => {
        cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas
        for (let i = 0; i < 5; i++) {
            cy.get('[data-cy="add-bolsa"]').click(); // Clica no botão "Adicionar" Bolsa
            cy.get('[data-cy="bolsa-input"]').type(`Bolsa ${i + 1}`, { delay: 0 });
        }
    };

    // Função para finalizar o processo de criação do Edital
    const salvarEFinalizarEdital = () => {
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
        cy.get('[data-cy="menu-finalizar"]').click(); // Clica no botão "Finalizar"
    };
});
