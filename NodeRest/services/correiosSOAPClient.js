let soap = require('soap');

class CreateClienteSoap {

    getCliente() {
        return new Promise((resolve, reject) => {
            soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
                (erro, cliente) => erro ? reject(erro) : resolve(cliente));
        });
    }
    
    calculaPrazo (dadosDaEntrega, callback) {
        this.getCliente()
            .then(client => client.CalcPrazo(dadosDaEntrega, callback))
            .catch(console.log)
    }
}

module.exports = function() {
    return CreateClienteSoap;
}


