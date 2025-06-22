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



    });

    // Resultado esperado: O sistema deve permitir que o usuário salve e/ou prossiga para a próxima sub-step.
});
