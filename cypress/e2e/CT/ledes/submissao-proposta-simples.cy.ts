describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
        cy.login(1); // Realiza login com o perfil de pesquisador
    });

    it('Realiza login no sistema e submete uma proposta', () => {
        acessarPaginaDeEditais();
        selecionarEdital(41);

        cy.get('[data-cy="criar-proposta"]').click(); // Cria uma nova proposta

        preencherInformacoesIniciais();
        cy.preencherAbrangenciaDaSubmissao(); // Preenche a abrangência da proposta
        preencherDaddosAcademicos(); // Preenche os dados acadêmicos do pesquisador responsável
        preencherTermo(); // Preenche o termo de aceite

        cy.get('[data-cy="menu-verificar-penden"]').click(); // Verifica pendências
        cy.get('[data-cy="menu-salvar"]').click(); // Salva a proposta
        cy.get('.ex40wuf2 > .MuiButtonBase-root').click(); // Submete a proposta
    });
});

// Função para acessar a página de Editais
const acessarPaginaDeEditais = () => {
    cy.get('[data-cy="breadcrumb-home"]').click(); // Clica no botão "Home"
    cy.get('[data-cy="editais-ver-mais"]').click(); // Clica no botão "Ver Mais"
};

// Função para selecionar o Edital desejado
const selecionarEdital = (id: number) => {
    cy.get(`:nth-child(${id}) > .MuiListItem-root > .e1w0rc4q5 > .e1w0rc4q2 > .MuiButtonBase-root`).click(); // Clica no botão "Editar Edital" para o edital específico
};

// Função para preencher os dados obrigatórios da proposta
const preencherInformacoesIniciais = () => {
    cy.get('[data-cy="tituloDoProjeto"]').type('Submissão simples', { delay: 0 }); // Preenche o campo "Título do Projeto"

    cy.get('[data-cy="instituicaoExecutoraId"]').click(); // Clica no campo "Instituição Executora"
    cy.get('[data-cy-index="instituicaoExecutoraId-item-1"]').click(); // Seleciona a instituição executora
};

// Função para preencher os dados acadêmicos do pesquisador responsável pela proposta
const preencherDaddosAcademicos = () => {
    cy.get('[data-cy="coordenacao"]').click(); // Clica no campo "Coordenação" 
    cy.get('[data-cy="dados-academicos"]').click(); // Clica na aba "Dados Acadêmicos"

    cy.get('[data-cy="criadoPor.instituicaoId"]').click(); // Clica no campo "Instituição"
    cy.get('[data-cy-index="criadoPor.instituicaoId-item-0"]').click(); // Seleciona a instituição
};

// Função para preencher o termo de aceite
const preencherTermo = () => {
    cy.get('[data-cy="termos"]').click(); // Clica na aba "Termos"
    cy.get('[data-cy="termo-de-aceite"]').click(); // Clica no checkbox "Termo de Aceite"
    cy.get('[data-cy="termoDeAceiteAceito"]').click(); // Marca o checkbox "Termo de Aceite Aceito"
};
