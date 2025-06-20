let textoTermoDeAceite = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce nibh. Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum augue id magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus. Integer pellentesque quam vel velit. Duis pulvinar. Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam metus. Etiam egestas wisi a erat.

Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo.Nullam faucibus mi quis velit.Integer in sapien.Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat.Fusce aliquam vestibulum ipsum.Aliquam erat volutpat.Pellentesque sapien.Cras elementum.Nulla pulvinar eleifend sem.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Quisque porta.Vivamus porttitor turpis ac leo.

Etiam posuere quam ac quam.Maecenas aliquet accumsan leo.Nullam dapibus fermentum ipsum.Etiam quis quam.Integer lacinia.Nulla est.Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis.Integer vulputate sem a nibh rutrum consequat.Maecenas lorem.Pellentesque pretium lectus id turpis.Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante.Fusce wisi.Phasellus faucibus molestie nisl.Fusce eget urna.Curabitur vitae diam non enim vestibulum interdum.Nulla quis diam.Ut tempus purus at lorem.

Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui.In rutrum.Sed ac dolor sit amet purus malesuada congue.In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero.Suspendisse sagittis ultrices augue.Mauris metus.Nunc dapibus tortor vel mi dapibus sollicitudin.Etiam posuere lacus quis dolor.Praesent id justo in neque elementum ultrices.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.In convallis.Fusce suscipit libero eget elit.Praesent vitae arcu tempor neque lacinia pretium.Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Morbi gravida libero nec velit.Morbi scelerisque luctus velit.Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.Proin mattis lacinia justo.Vestibulum facilisis auctor urna.Aliquam in lorem sit amet leo accumsan lacinia.Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim.Phasellus et lorem id felis nonummy placerat.Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci.Aenean vel massa quis mauris vehicula lacinia.Quisque tincidunt scelerisque libero.Maecenas libero.Etiam dictum tincidunt diam.Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est.Suspendisse nisl.Sed convallis magna eu sem.Cras pede libero, dapibus nec, pretium sit amet, tempor quis, urna.

Praesent in mauris eu tortor porttitor accumsan.Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus.Aenean fermentum risus id tortor.Integer imperdiet lectus quis justo.Integer tempor.Vivamus ac urna vel leo pretium faucibus.Mauris elementum mauris vitae tortor.In dapibus augue non sapien.Aliquam ante.Curabitur bibendum justo non orci.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante.Aliquam erat volutpat.Nunc auctor.Mauris pretium quam et urna.Fusce nibh.Duis risus.Curabitur sagittis hendrerit ante.Aliquam erat volutpat.Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat.Duis condimentum augue id magna semper rutrum.Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit.Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo.Fusce consectetuer risus a nunc.Aliquam ornare wisi eu metus.Integer pellentesque quam vel velit.Duis pulvinar.

Aenean placerat.In vulputate urna eu arcu.Aliquam erat volutpat.Suspendisse potenti.Morbi mattis felis at nunc.Duis viverra diam non justo.In`;

describe('Adicionar o valor máximo no campo do Termo de Aceite', () => {
    beforeEach(() => {
        // Realiza login no sistema antes de cada teste
        cy.login(0); // Realiza login como Gestor (índice 0)
    });

    it('Deve permitir que o usuário insira o valor máximo permitido no campo "Termo de Aceite"', () => {
        // Preenche as informações do Termo de Aceite com o valor máximo
        preencherTermoDeAceiteComValorMaximo();

        // Valida que o sistema permite avançar para a próxima seção
        cy.get('.css-y8ykzc > .MuiTypography-root')
            .eq(0)
            .should('contain.text', 'Texto do Edital');  // Verifica se a aba 'Texto do Edital' está visível, por exemplo
    });

    // Função para preencher o campo do Termo de Aceite com o valor máximo
    const preencherTermoDeAceiteComValorMaximo = () => {
        // Navegar até a seção de editar o edital e preencher o campo de "Termo de Aceite"
        acessarSeçãoDePublicarEdital();

        // Preenche o Termo de Aceite com o valor máximo de texto permitido
        preencherTermoDeAceite();
    };

    // Função para acessar a seção de 'Publicar Edital'
    const acessarSeçãoDePublicarEdital = () => {
        cy.get('[data-cy="nav-group-edital"]').click(); // Clica na navegação de Editais
        cy.get('[data-cy="nav-item-publicar-edital"]').click(); // Clica na opção "Publicar Edital"
        cy.get('[data-cy="add-publicar-edital"]').click(); // Clica para adicionar um novo edital
        cy.get('.css-jir0u').click(); // Fecha o menu lateral
    };

    // Função para preencher o campo "Termo de Aceite" com o valor máximo
    const preencherTermoDeAceite = () => {

        cy.get('[data-cy="termo-de-aceite"]').click(); // Clica na aba 'Termo de Aceite'
        cy.get('.ck-editor__editable', { timeout: 2000 }).should('be.visible'); // Espera o editor carregar

        // Preenche o campo do Termo de Aceite com o texto máximo permitido (exemplo com 5000 caracteres)
        cy.get('.ck-editor__editable').clear().realType(textoTermoDeAceite, { delay: 0 }); // Preenche com o texto máximo
        cy.get('[data-cy="next-button"]').click(); // Clica no botão "Próximo" para tentar salvar o Termo de Aceite
    };
});
