
it('Deve permitir que um pesquisador faça login com as credenciais corretas', () => {
    // Carregar o arquivo JSON de credenciais
    cy.fixture('credenciais_sistema.json').then((credenciais) => {
        // segundo conjunto de credenciais (grupo1_pesq@sig.com)
        const { login, senha } = credenciais.credenciais[1]; // Usando o primeiro conjunto de credenciais (grupo1_gestor@sig.com)

        // Acessar o sistema com a URL e as credenciais
        cy.visit(credenciais.url_sistema);
        cy.get('#login').type(login);
        cy.get('#senha').type(senha);
        cy.get('.css-1wz47u4 > .MuiButton-root').click(); // Botão Acessar da página de login
    });
});
