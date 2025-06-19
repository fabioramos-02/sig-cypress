import { getCurrentDateTime } from '../helpers/date.helper';

describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
        // Gancho em nível raíz
        // executa antes de realizar cada teste(it)
        cy.typelogin(
            '[URL do sistema]', // [URL do sistema]
            '[E-mail do usuário]', // [E-mail do usuário]
            '[Senha do usuário]' // [Senha do usuário]
        ); //Acessa a página de login usando as credenciais do usuário e senha.
    });
    it.only('Realiza login no sistema e cria um edital médio', () => { //Teste edital simples, se houver mais de um teste, o it.only executa apenas esse teste.
        cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
        cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital

        // 1. Informação do Edital
        // - Insere a Identificação do Edital
        cy.get('[data-cy="nome"]').type(
            'Grupo-01 E.S. 006/2025 fabio-ramos', //Edite essa linha para preencher o nome do Edital
            { delay: 0 },
        ); //Preenche o campo "Nome" do Edital

        // - Restrições
        cy.get('[data-cy="restricoes"]').click(); //Clica na aba Restrições para seguir para a página de Restrições
        cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); //Marca a opção "Definir Duração do Projeto em Meses"
        cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); //Preenche o campo "Duração do Projeto em Meses com o valor 6"
        cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); //Marca a opção "Pesquisador pode submeter várias propostas"

        // - Termo de Aceite
        // Adicionar um texto de Termo de Aceite
        cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba Termo de Aceite
        cy.get('.ck-editor__editable', { timeout: 5000 }).should('be.visible'); // Espera o editor carregar
        cy.get('.ck-editor__editable').clear().realType('Termo de Aceite do Edital de Teste do grupo Fabio Ramos', { delay: 0 }); // Insere o texto com realType

        //Em Texto do Edital
        // Adicionar um texto de Edital
        cy.get('[data-cy="texto-do-edital"]').click(); // Clica na aba Texto do Edital
        cy.get('.ck-editor__editable', { timeout: 5000 }).should('be.visible'); // Espera o editor carregar
        cy.get('.ck-editor__editable').clear().realType('Texto do Edital de Teste do grupo Fabio Ramos', { delay: 0 }); // Insere o texto com realType

        // - Abrangencia
        cy.get('[data-cy="abrangencia"]').click(); //Clica na aba Abrangência para seguir para a página de Abrangência
        //Selecionar Mato Grosso do Sul, Minas Gerais e São Paulo (Obs SP já vem selecionado por padrão)
        cy.get('[data-cy="estado-minas-gerais"]').click(); //Clica no checkbox do estado de Minas Gerais
        cy.get('[data-cy="estado-mato-grosso-do-s"]').click(); //Clica no checkbox do estado de Mato Grosso do Sul

        //2 - CRONOGRAMA
        // - Periodo de Submissão
        cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
        cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão

        //3 - Orçamento
        // - Programa
        cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
        cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
        cy.get('[data-cy="chamadaUnsaved.termino"]').type(
            getCurrentDateTime({ addYears: 1 }),
        ); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
        cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão



        //3 - Orçamento
        cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
        cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
        cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
        cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas

        // 4 - Perguntas
        // - Indicadores de Produção
        cy.get('[data-cy="perguntas"]').click(); //Clica na aba Perguntas para seguir para a página de Perguntas
        cy.get('[data-cy="indicadores-de-producao"]').click(); //Clica na aba Indicadores de Produção para seguir para a página de Indicadores de Produção
        cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Indicador de Produção
        //selecionar 3 indicadores de produção
        cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
        cy.get('[data-cy-index="indicadorProducaoUnsaved.id-item-0"]').click(); //Seleciona o primeiro Indicador de Produção da lista de Indicadores de Produção
        cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção
        cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
        cy.get('[data-cy-index="indicadorProducaoUnsaved.id-item-1"]').click(); //Seleciona o segundo Indicador de Produção da lista de Indicadores de Produção
        cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção
        cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click(); //Clica no campo de seleção de Indicador de Produção
        cy.get('[data-cy-index="indicadorProducaoUnsaved.id-item-2"]').click(); //Seleciona o terceiro Indicador de Produção da lista de Indicadores de Produção
        cy.get('[data-cy="indicadorProducao-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Indicador de Produção

        // Finalização
        cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
        cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital

        //Resultado esperado: O Edital deve ser salvo com sucesso e o usuário deve ser redirecionado para a página de Editais.
    });

});
