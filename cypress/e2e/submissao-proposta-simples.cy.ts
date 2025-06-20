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
    cy.get(':nth-child(199) > .MuiListItem-root > .e1w0rc4q5 > .e1w0rc4q2 > .MuiButtonBase-root').click(); // Clica no botão "Editar Edital" para o edital específico
    cy.wait(300); // Aguarda 300ms para garantir que a página foi carregada completamente
};

// Função para criar a proposta
const criarProposta = () => {
    cy.get('[data-cy="criar-proposta"]').click(); // Clica no botão "Criar Proposta"
};

// Função para preencher os dados obrigatórios da proposta
const preencherDadosDaProposta = () => {
    cy.get('[data-cy="tituloDoProjeto"]').type('Submissão de Proposta Cypress', { delay: 0 }); // Preenche o campo "Título do Projeto"
    // Outros campos obrigatórios podem ser preenchidos aqui, por exemplo:
    // cy.get('[data-cy="descricaoDoProjeto"]').type('Descrição detalhada da proposta', { delay: 0 });
    // cy.get('[data-cy="dataInicio"]').type('01/01/2025', { delay: 0 });
};

// Função para preencher os dados pessoais do pesquisador responsável pela proposta
const preencherDadosPessoais = () => {
    cy.get('[data-cy="coordenacao"]').click(); // Clica no campo "Coordenação"
    cy.get('[data-cy="dados-pessoais"]').click(); // Clica na aba "Dados Pessoais"

    // Seleciona o pesquisador responsável
    cy.get(':nth-child(1) > .custom-input-container > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > .MuiAutocomplete-endAdornment > .MuiAutocomplete-popupIndicator > [data-testid="ArrowDropDownIcon"]').click(); // Clica no campo de seleção de pesquisador
};
