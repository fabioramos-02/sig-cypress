describe('Validar adição de moeda estrangeira em Rubrica', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
        cy.wait(1000); // Aguarda 1 segundo para garantir que o sistema esteja pronto
        cy.preencherIdentificacaoDoEdital("Grupo-01 E.M. 005/2025 fabio-ramos Edital Médio"); // Preenche as informações de identificação do edital
    });

    it('Deve permitir que o usuário adicione uma Rubrica com Moeda Estrangeira', () => {
        const modalidadeBolsa = 1; // Seleciona a primeira Modalidade de Bolsa (DCT)
        const nivelBolsa = 0; // Seleciona o primeiro Nível de Bolsa (0H - R$ 4.484,00)
        const quantidadeBolsa = true; // Marca a opção de quantidade de bolsas
        const quantidade = "999999999999999999999999"; // Quantidade acima do limite permitido

        // Preenche as informações de Bolsa com Moeda Estrangeira
        cy.preencherBolsas(modalidadeBolsa, nivelBolsa, quantidadeBolsa, quantidade);
        cy.get('[data-cy="menu-salvar"]').click(); // Clica no botão "Salvar" para tentar salvar as alterações
        //Sistema deve exibir mensagem de erro ao tentar salvar

        cy.get('.MuiAlert-message').should('be.visible')
            .and('have.text', 'A quantidade de bolsas por proposta deve ser menor ou igual a 999.999.999.999.'); // Verifica se a mensagem de erro está visível



    });

    // Resultado esperado: O sistema não deve aceitar está bolsa, já que o valor em Quantidade por Proposta está acima do permitido. Além disso, deve sinalizar ao usuário que ele necessita alterar o valor, inserindo um número no intervalo aceito.
});
