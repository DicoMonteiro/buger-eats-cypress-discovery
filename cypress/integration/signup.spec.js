import signup from '../pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'

describe('Signup', () => {

    // before(() => {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
        
    // });

    // beforeEach(function () {
    //     // cy.log('Tudo aqui é executado sempre ANTES de CADA caso de testes')
    //     cy.fixture('deliver').then((deliver) => {
    //         this.deliver = deliver
    //     })
    // });

    // after(() => {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // });

    // afterEach(() => {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de testes') 
    // });

    // var signup = new SignupPage()

    it('User should be deliver', function () {

        // var deliver = {
        //     name: 'Adriano Almeida',
        //     cpf: '00000014949',
        //     email: 'adriano@teste.com.br',
        //     whatsapp: '71999999999',
        //     address: {
        //         postalcode: '01218012',
        //         street: 'Alameda Eduardo Prado',
        //         number: '838',
        //         complement: 'Apt 86',
        //         district: 'Campos Elíseos',
        //         city_state: 'São Paulo/SP'
        //     },
        //     delivery_method: 'Moto',
        //     cnh: 'cnh-digital.jpg'
        // }

        var deliver = SignupFactory.deliver()

        signup.go()

        // signup.fillForm(this.deliver.signup)

        signup.fillForm(deliver)

        signup.submitForm()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signup.modalContentShouldBe(expectedMessage)
    });


    it('Incorrect document', function () {

        // var deliver = {
        //     name: 'Adriano Almeida',
        //     cpf: '000000149AA',
        //     email: 'adriano@teste.com.br',
        //     whatsapp: '71999999999',
        //     address: {
        //         postalcode: '01218012',
        //         street: 'Alameda Eduardo Prado',
        //         number: '838',
        //         complement: 'Apt 86',
        //         district: 'Campos Elíseos',
        //         city_state: 'São Paulo/SP'
        //     },
        //     delivery_method: 'Moto',
        //     cnh: 'cnh-digital.jpg'
        // }

        var deliver = SignupFactory.deliver()

        deliver.cpf = '000000149AA'

        signup.go()

        // signup.fillForm(this.deliver.cpf_inv)

        signup.fillForm(deliver)

        signup.submitForm()

        signup.spanContentShouldBe('Oops! CPF inválido')
    });

    it('Incorrect email', function () {
        var deliver = SignupFactory.deliver()

        deliver.email = 'adrianoteste.com.br'

        signup.go()
        // signup.fillForm(this.deliver.email_inv)
        signup.fillForm(deliver)
        signup.submitForm()
        signup.spanContentShouldBe('Oops! Email com formato inválido.')
    });

    context('Required fields', function (){
        
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postalcode', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function () {
            signup.go()
            signup.submitForm()
        })

        messages.forEach(function (msg){
            it(`${msg.field} is required`, function (){
                signup.spanContentShouldBe(msg.output)
            });
        })
    });

    // it('Required fields', function (){
    //     signup.go()
    //     signup.submitForm()

    //     signup.spanContentShouldBe('É necessário informar o nome')
    //     signup.spanContentShouldBe('É necessário informar o CPF')
    //     signup.spanContentShouldBe('É necessário informar o email')
    //     signup.spanContentShouldBe('É necessário informar o CEP')
    //     signup.spanContentShouldBe('É necessário informar o número do endereço')
    //     signup.spanContentShouldBe('Selecione o método de entrega')
    //     signup.spanContentShouldBe('Adicione uma foto da sua CNH')
    // });
});