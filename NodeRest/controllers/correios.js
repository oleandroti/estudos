module.exports = (app) =>{

    app.post('/correios/calculo-prazo', (req, resp)=>{
        let dadosDaEntrega = req.body;

        req.assert('cepOrigem', 'cepOrigem é Obrigatório').notEmpty();
        // req.assert('cepOrigem', 'cepOrigem formado inválido (XXXXX-XXX)').matches('/^[0-9]{5}-[09]{3}')

        req.assert('cepDestino', 'cepDestino é Obrigatório').notEmpty();
        // req.assert('cepDestino', 'cepDestino formado inválido (XXXXX-XXX)').matches('/^[0-9]{5}-[09]{3}')

        let erros = req.validationErrors();
         
        if(erros) {
            console.log(erros);
            resp.status(400).send(erros);
            return;
        }

        let correiosSOAPClient = new app.services.correiosSOAPClient();
        console.log(correiosSOAPClient);

        let dadosCalcular = {};
        dadosCalcular.nCdServico = 40010;
        dadosCalcular.sCepOrigem = dadosDaEntrega.cepOrigem;
        dadosCalcular.sCepDestino = dadosDaEntrega.cepDestino;

        correiosSOAPClient.calculaPrazo(dadosCalcular, (erro, resultado) => {
            if(erro) {
                resp.status(500).send(erro);
                return;
            }
            console.log('Prazo Calculado');
            resp.send(resultado);
        });
        
        console.log(dadosDaEntrega);
    });

}