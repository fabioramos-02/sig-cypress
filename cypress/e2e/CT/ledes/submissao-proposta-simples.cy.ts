describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(1); // Chama a função de login com o perfil de pesquisador
    });

    it('Realiza login no sistema e submete uma proposta', () => {
        // Navega até a página de Editais
        acessarPaginaDeEditais();

        // Seleciona o Edital específico
        selecionarEdital(197);

        // Cria e preenche a proposta
        cy.get('[data-cy="criar-proposta"]').click(); // Clica no botão "Criar Proposta"

        // Preenche a proposta com os dados necessários
        // cy.get('[data-cy="tituloDoProjeto"]').type('Submissão de Proposta Cypress', { delay: 0 }); // Preenche o campo "Título do Projeto"
        preencherInformacoesIniciais();

        //preencher abrangencia
        cy.preencherAbrangenciaDaSubmissao(); // Preenche a abrangência da proposta

        // Completa o preenchimento dos dados pessoais
        // preencherDadosPessoais();


        cy.get('[data-cy="coordenacao"]').click(); // Clica no campo "Coordenação" depois remover
        preencherEndereco(); // Preenche o endereço do pesquisador responsável

        preencherDaddosAcademicos(); // Preenche os dados acadêmicos do pesquisador responsável

        // preencherDadosProfissionais(); // Preenche os dados profissionais do pesquisador responsável

        preencherTermo();
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
    // Prenche as informações Iniciais da Proposta
    cy.get('[data-cy="tituloDoProjeto"]').type('Submissão de Proposta Cypress', { delay: 0 }); // Preenche o campo "Título do Projeto"

    // cy.get('[data-cy="instituicaoExecutoraId"]').click(); // Clica no campo "Instituição Executora"
    // cy.get('[data-cy-index="instituicaoExecutoraId-item-1"]').click();


    // cy.get('[data-cy="unidadeExecutoraId"]').click(); // Clica no campo "Unidade Executora"
    // cy.get('[data-cy-index="unidadeExecutoraId-item-0"]').click(); // Seleciona a primeira unidade da lista

    // cy.get('[data-cy="areaDeConhecimento-adicionar"]').click(); // Clica no botão para adicionar área de conhecimento
    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica na primeira área de conhecimento da lista
    cy.get('[data-cy="areaDeConhecimento.0.grandeAreaId"]').click(); // Clica no campo "Grande Área"
    cy.get('[data-cy-index="areaDeConhecimento.0.grandeAreaId-item-1"]').click(); // Seleciona a primeira grande área da lista

    cy.wait(1000); // Aguarda 1 segundo para garantir que a lista de áreas esteja carregada
    
    cy.get('[data-cy="areaDeConhecimento.0.areaId"]').should('be.visible').click(); // Clica no campo "Área"
    cy.get('[data-cy-index="areaDeConhecimento.0.areaId-item-1"]').click(); // Seleciona a primeira área da lista
    
    cy.wait(1000); // Aguarda 1 segundo para garantir que a lista de áreas esteja carregada

    cy.get('[data-cy="areaDeConhecimento.0.subAreaId"]').should('be.visible').click(); // Clica no campo "Subárea"
    cy.get('[data-cy-index="areaDeConhecimento.0.subAreaId-item-1"]').click(); // Seleciona a primeira subárea da lista

};


// Função para preencher os dados pessoais do pesquisador responsável pela proposta
const preencherDadosPessoais = () => {
    cy.get('[data-cy="coordenacao"]').click(); // Clica no campo "Coordenação"
    cy.get('[data-cy="dados-pessoais"]').click(); // Clica na aba "Dados Pessoais"

    cy.wait(1000); // Aguarda 1 segundo para garantir que a aba "Dados Pessoais" esteja carregada
};

const preencherEndereco = () => {
    cy.get('[data-cy="endereco"]').click(); // Clica na aba "Endereço"

    cy.get('[data-cy="criadoPor.endereco.cep"]').type('79904022', { delay: 0 }); // Preenche o campo "CEP"
    cy.get('[data-cy="criadoPor.endereco.logradouro"]').type('Rua Exemplo', { delay: 0 }); // Preenche o campo "Logradouro"
    cy.get('[data-cy="criadoPor.endereco.numero"]').type('123', { delay: 0 }); // Preenche o campo "Número"
    cy.get('[data-cy="criadoPor.endereco.complemento"]').type('Apto 101', { delay: 0 }); // Preenche o campo "Complemento"

    cy.get('[data-cy="criadoPor.endereco.bairro"]').type('Vila Ferroviária II', { delay: 0 }); // Preenche o campo "Bairro"
    cy.get('[data-cy="criadoPor.endereco.estado"]').click(); // Clica no campo "Estado"
    cy.wait(2000); // Aguarda 1 segundo para garantir que o campo "Estado" esteja carregado
    cy.get('[data-cy-index="criadoPor.endereco.estado-item-11"]').click(); // Seleciona o estado (primeiro da lista)
    cy.get('[data-cy="criadoPor.endereco.municipio"]').click(); // Clica no campo "Município"
    cy.wait(2000); // Aguarda 1 segundo para garantir que o campo "Município" esteja carregado
    cy.get('[data-cy-index="criadoPor.endereco.municipio-item-1"]').click(); // Seleciona o município

}

const preencherDaddosAcademicos = () => {
    cy.get('[data-cy="dados-academicos"]').click(); // Clica na aba "Dados Acadêmicos"

    // cy.get('[data-cy="criadoPor.instituicaoId"]').click(); // Clica no campo "Instituição"
    // cy.get('[data-cy-index="criadoPor.instituicaoId-item-0"]').click(); // Seleciona a primeira instituição da lista

    // cy.get('[data-cy="criadoPor.unidadeId"]').click(); // Clica no campo "Unidade"
    // cy.get('[data-cy-index="criadoPor.unidadeId-item-0"]').click(); // Seleciona a primeira unidade da lista

    // cy.get('[data-cy="criadoPor.nivelAcademicoId"]').click(); // Clica no campo "Nível Acadêmico"
    // cy.get('[data-cy-index="criadoPor.nivelAcademicoId-item-0"]').click(); // Seleciona o primeiro nível acadêmico da lista

    // cy.get('[data-cy="criadoPor.lattes"]').type('http://lattes.cnpq.br/1234567890123456', { delay: 0 }); // Preenche o campo "Lattes" com um exemplo de URL
    // cy.get('[data-cy="criadoPor.linkedin"]').type('https://www.linkedin.com/in/exemplo', { delay: 0 }); // Preenche o campo "LinkedIn" com um exemplo de URL 

    cy.get('[data-cy="criadoPor.areaDeConhecimento-adicionar"]').click(); // Clica no botão para adicionar área de conhecimento
    cy.get('.MuiAccordionSummary-content > :nth-child(1)').click(); // Clica na primeira área de conhecimento da lista

    cy.get('[data-cy="criadoPor.areaDeConhecimento.0.grandeAreaId"]').click(); // Clica no campo "Grande Área"
    cy.get('[data-cy-index="criadoPor.areaDeConhecimento.0.grandeAreaId-item-1"]').click(); // Seleciona a primeira grande área da lista

    cy.wait(1000); // Aguarda 1 segundo para garantir que a lista de áreas esteja carregada

    cy.get('[data-cy="criadoPor.areaDeConhecimento.0.areaId"]').click(); // Clica no campo "Área"
    cy.get('[data-cy-index="criadoPor.areaDeConhecimento.0.areaId-item-1"]').click(); // Seleciona a primeira área da lista

    cy.wait(1000); // Aguarda 1 segundo para garantir que a lista de subáreas esteja carregada
    cy.get('[data-cy="criadoPor.areaDeConhecimento.0.subAreaId"]').click(); // Clica no campo "Subárea"
    cy.get('[data-cy-index="criadoPor.areaDeConhecimento.0.subAreaId-item-1"]').click(); // Seleciona a primeira subárea da lista
}

const preencherDadosProfissionais = () => {
    cy.get('[data-cy="dados-profissionais"]').click(); // Clica na aba "Dados Profissionais"
}

const preencherTermo = () => {
    cy.get('[data-cy="termo"]').click(); // Clica na aba "Termo"
    cy.get('[data-cy="termo-de-aceite"]').click(); // Clica no checkbox "Termo de Aceite"

    cy.get('[data-cy="edital.termoDeAceite"]').type('Aceito os termos e condições do edital.', { delay: 0 }); // Preenche o campo "Termo de Aceite"
    cy.get('[data-cy="termoDeAceiteAceito"]').click(); // Marca o checkbox "Termo de Aceite Aceito"

};
