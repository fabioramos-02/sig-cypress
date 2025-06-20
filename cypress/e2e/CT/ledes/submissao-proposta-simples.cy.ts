describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.typelogin('[URL do sistema]', '[E-mail do usuário]', '[Senha do usuário]');
    });

    it('Realiza login no sistema e submete uma proposta', () => {
        // Navega até a página de Editais
        acessarPaginaDeEditais();

        // Seleciona o Edital específico
        selecionarEdital();

        // Cria e preenche a proposta
        criarProposta();

        // Preenche a proposta com os dados necessários
        preencherDadosDaProposta();

        // Completa o preenchimento dos dados pessoais
        preencherDadosPessoais();

        // Outros passos podem ser adicionados conforme a necessidade
        // Exemplo: submeter proposta, validar resultados, etc.
    });
});

// Função para acessar a página de Editais
const acessarPaginaDeEditais = () => {
    cy.get('[data-cy="breadcrumb-home"]').click(); // Clica no botão "Home"
    cy.get('[data-cy="editais-ver-mais"]').click(); // Clica no botão "Ver Mais"
};

// Função para selecionar o Edital desejado
const selecionarEdital = () => {
    cy.get(':nth-child(193) > .MuiListItem-root > .e1w0rc4q5 > .e1w0rc4q2 > .MuiButtonBase-root').click(); // Clica no botão "Editar Edital" para o edital específico
    cy.wait(300); // Aguarda 300ms para garantir que a página foi carregada completamente
};

// Função para criar a proposta
const criarProposta = () => {
    cy.get('[data-cy="criar-proposta"]').click(); // Clica no botão "Criar Proposta"
};

// Função para preencher os dados obrigatórios da proposta
const preencherDadosDaProposta = () => {
    // Prenche as informações Iniciais da Proposta
    cy.get('[data-cy="tituloDoProjeto"]').type('Submissão de Proposta Cypress', { delay: 0 }); // Preenche o campo "Título do Projeto"

    cy.get('[data-cy="instituicaoExecutoraId"]').click(); // Clica no campo "Instituição Executora"
    cy.get('[data-cy="instituicaoExecutoraId-item-1"]', { timeout: 10000 }).should('be.visible').click();


    cy.get('[data-cy="unidadeExecutoraId"]').click(); // Clica no campo "Unidade Executora"
    cy.wait(500); // Aguarda meio segundo para garantir que a lista de unidades foi
    cy.get('[data-cy="unidadeExecutoraId-item-1"]').click(); // Seleciona a primeira unidade da lista
};

// Função para preencher os dados pessoais do pesquisador responsável pela proposta
const preencherDadosPessoais = () => {
    cy.get('[data-cy="coordenacao"]').click(); // Clica no campo "Coordenação"
    cy.get('[data-cy="dados-pessoais"]').click(); // Clica na aba "Dados Pessoais"

    // Seleciona o pesquisador responsável
    cy.get(':nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > [data-testid="ArrowDropDownIcon"]').click(); // Clica no campo de seleção de pesquisador
};
