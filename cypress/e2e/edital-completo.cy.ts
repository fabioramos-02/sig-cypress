import { getCurrentDateTime } from '../helpers/date.helper';

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.typelogin('[URL do sistema]', '[E-mail do usuário]', '[Senha do usuário]');
    });

    it.only('Realiza login no sistema e cria um edital completo', () => {
        // Início do Teste de Edição Completo (E.C.)
        //Informações do Edital
        preencherInformacoesDoEdital();
        // preencherRestricoes();
        // preencherTermoDeAceite();
        // preencherTextoDoEdital();
        // preencherAbrangencia();
        // preencherInformacoesComplementares();

        // Cronograma
        // preencherCronograma();

        // Orçamento
        // preencherOrcamento();
        // preencherRubricas();
        // preencherFaixasDeFinanciamento();

        //Documentos
        // preencherDocumentos();
        // preencherDocumentosPessoais();

        // Perguntas
        // preencherDescricaoDoProjeto();
        // preencherIndicadoresDeProducao();

        // Bolsas do Edital
        preencherBolsas();

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

            cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]').type(faixas[i - 1], { delay: 1 }); // Preenche o nome da Faixa de Financiamento

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
        cy.get('[data-cy="documentos"]').click(); // Clica na aba Documentos
        cy.get('[data-cy="documentos-da-proposta"]').click(); // Clica na aba Documentos da Proposta
        cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click(); // Clica no botão "Adicionar" Documento da Proposta

        cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica no campo de seleção de Documento
        cy.get('[data-cy="documentoPropostaEdital.0.nome"]').type('Documento de Proposta 1', { delay: 0 }); // Preenche o nome do Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').type('Descrição do Documento de Proposta 1', { delay: 0 }); // Preenche a descrição do Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click(); // Clica no campo de seleção de Formato de Arquivo
        cy.get('[data-cy-index="documentoPropostaEdital.0.formatoArquivo-item-5"]').click(); // Seleciona o formato "JPG"
        cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').type('5', { delay: 0 }); // Preenche o tamanho do arquivo em MB

        cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click(); // Clica novamente no botão "Adicionar" Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital--expandable-item"] > .MuiAccordionSummary-root > .MuiAccordionSummary-content > :nth-child(1)').click(); // Clica no campo de seleção de Documento
        cy.get('[data-cy="documentoPropostaEdital.1.nome"]').type('Documento de Proposta 2', { delay: 0 }); // Preenche o nome do Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital.1.descricao"]').type('Teste documento 2', { delay: 0 }); // Preenche a descrição do Documento da Proposta
        cy.get('[data-cy="documentoPropostaEdital.1.formatoArquivo"]').click(); // Clica no campo de seleção de Formato de Arquivo
        cy.get('[data-cy-index="documentoPropostaEdital.1.formatoArquivo-item-5"]').click(); // Seleciona o formato "JPG"
        cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]').type('5', { delay: 0 }); // Preenche o tamanho do arquivo em MB
    };

    const preencherDocumentosPessoais = () => {
        cy.get('[data-cy="documentos"]').click(); // Clica na aba Documentos
        cy.get('[data-cy="documentos-pessoais"]').click(); // Clica na aba Documentos Pessoais

        // Loop para adicionar 5 documentos pessoais
        for (let i = 0; i < 5; i++) {
            cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click(); // Clica no botão "Adicionar" Documento Pessoal
            cy.wait(1000); // Adiciona um delay de 1 segundo após adicionar o documento pessoal
            cy.get(`[data-cy="documentoPessoalEdital.${i}.documentoPessoalId"]`).click(); // Clica no campo de seleção de Documento Pessoal

            // Seleciona o documento baseado no índice
            cy.get(`[data-cy-index="documentoPessoalEdital.${i}.documentoPessoalId-item-0"]`).click(); // Seleciona o documento

            // Se necessário, podemos adicionar uma pausa entre as interações, mas não é obrigatório
            cy.wait(500); // Adiciona uma pausa de 500ms entre as ações para evitar problemas com carregamento de elementos
        }
    };

    const preencherDescricaoDoProjeto = () => {
        cy.get('[data-cy="perguntas"]').click(); // Clica na aba Perguntas
        cy.get('[data-cy="descricao-do-projeto"]').click(); // Clica na aba Descrição do Projeto

        // Loop para adicionar 5 perguntas de Descrição do Projeto
        for (let i = 0; i < 5; i++) {
            // Clica no campo de seleção de Pergunta de Descrição do Projeto
            cy.get('[data-cy="perguntaDescId"]').click();

            // Seleciona a pergunta correspondente ao índice
            cy.get(`[data-cy-index="perguntaDescId-item-${i}"]`).click();
            cy.wait(1000); // Espera 2 segundos antes de clicar


            // Clica no botão "Adicionar" para adicionar uma nova Pergunta de Descrição do Projeto
            cy.get('[data-cy="pergunta-adicionar"]').click();

            // Espera 1 segundo entre cada interação (ajuste conforme necessário)
            cy.wait(500);
        }
    };



    // Função para preencher as Perguntas de Descrição do Projeto e Indicadores de Produção
    const preencherIndicadoresDeProducao = () => {
        cy.get('[data-cy="perguntas"]').click(); // Clica na aba Perguntas
        cy.get('[data-cy="indicadores-de-producao"]').click(); // Clica na aba Indicadores de Produção
        for (let i = 0; i < 3; i++) {
            cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" Indicador de Produção
            cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); // Clica no campo de seleção de Indicador de Produção
            cy.get('[data-cy-index="indicadorProducaoUnsaved.id-item-0"]').click(); // Seleciona o primeiro Indicador de Produção
            cy.get('[data-cy="indicadorProducao-confirmar"]').click(); // Clica em confirmar
        }
    };

    const preencherBolsas = () => {
        cy.get('[data-cy="bolsas-do-edital"]').click(); // Clica na aba Bolsas do Edital
        cy.get('[data-cy="bolsas"]').click(); // Clica na aba Bolsas

        // Loop para adicionar 5 bolsas
        for (let i = 0; i < 5; i++) {
            cy.get('[data-cy="add-button"]').click(); // Clica no botão "Adicionar" para criar uma nova Bolsa

            // Seleciona a Modalidade de Bolsa correspondente
            cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
            cy.get(`[data-cy-index="bolsaEditalUnsaved.modalidadeBolsaId-item-${i}"]`).click(); // Seleciona a modalidade de bolsa correspondente ao índice

            // Seleciona o Nível de Bolsa correspondente (intervalo de 0 a 2)
            cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
            const nivelIndice = i % 3; // Garantir que o índice para o Nível de Bolsa fique entre 0, 1, 2
            cy.get(`[data-cy-index="bolsaEditalUnsaved.nivelBolsaId-item-${nivelIndice}"]`).click(); // Seleciona o nível de bolsa correspondente

            // Clica em confirmar para salvar a Bolsa
            cy.get('[data-cy="bolsaEdital-confirmar"]').click();

            // Espera 1 segundo entre as interações (ajuste conforme necessário)
            cy.wait(1000); // Adiciona uma pausa de 1 segundo entre as interações
        }
    };

    // Função para finalizar o processo de criação do Edital
    const salvarEFinalizarEdital = () => {
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar"
        cy.get('[data-cy="menu-finalizar"]').click(); // Clica no botão "Finalizar"
    };
});
