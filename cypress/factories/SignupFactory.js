var faker = require('faker');
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        
        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "71999999999",
            address: {
                postalcode: "01218012",
                street: "Alameda Eduardo Prado",
                number: "838",
                complement: "Apt 86",
                district: "Campos Elíseos",
                city_state: "São Paulo/SP"
            },
            delivery_method: "Moto",
            cnh: "cnh-digital.jpg"
        }

        return data
    }
}