

class SignupPage {

    go() {
        // Renderizar a tela para uma padrão
        // cy.viewport(1440, 900)
        // cy.visit('https://buger-eats.vercel.app')
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        // Checkpoint para validar a página certa
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        // Dados do deliver
        // cy.get('input[placeholder="Nome completo"]').type(deliver.name)
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        // Dados de Endereço
        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()
        // Validação dos dados retornados ao solicitar busca do CEP
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)
        // Preenchendo os demais campos de endereço
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.complement)

        // Definir o Método de entrega
        // cy.get(`.delivery-method > li > img[alt="${deliver.metodo_entrega}"] ~ span`).click()
        // cy.get(`ul.delivery-method li img[alt="${deliver.metodo_entrega}"]`).click()
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        // Realizando Upload do arquivo CNH
        cy.get('input[accept^="image"]').attachFile('images/' + deliver.cnh)
    }

    submitForm() {
        // Submetendo o formulário
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        // Validação do cadastro com sucesso
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectedMessage)
    }

    spanContentShouldBe(expectedMessage) {
        // Validação do CPF inválido
        // cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;