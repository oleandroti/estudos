let logger = require('../services/logger.js');

module.exports = (app) => {
    app.get('/pagamentos', (req, resp) => {
        resp.send('OK');
    });

    app.get('/pagamentos/pagamento/:id', (req, resp) => {
        let id = req.params.id;
        logger.info('Consultando Pagamento ID: ' + id);
        console.log('Consultando Pagamento ID: ' + id);

        let mencachedClient = new app.services.memcachedClient();

        mencachedClient.get('pagamento-' + id, (erro, resultado) => {
            if(erro || !resultado) {
                console.log('MISS - chave não encontrada : pagamento-' + id);
                let connection = app.persistencia.connectionFactory();
                let pagamentoDao = new app.persistencia.PagamentoDao(connection);
                let pagamento = {};
                pagamento.id = id;

                pagamentoDao.buscaPorId(pagamento, (erro,resultado) => {
                    console.log(pagamento)
                    if(erro) {
                        console.log('Erro Pagamento: ' + erro);
                        resp.status(500).send(erro);
                        return;
                    }
                    console.log('Pagamento Encontrado');
                    resp.json(resultado[0]);
                });
            }
            else {
                console.log('HIT - valor: ' + JSON.stringify(resultado));
                resp.json(resultado);
                return;
            }
        });
    });

    app.post('/pagamentos/pagamento', (req, resp) => {

        req.assert("valor", "Valor é Obrigatório").notEmpty();
        req.assert("valor", "Valor deve ser decimal").isFloat();

        let erros = req.validationErrors();

        if(erros)
            console.log(erros);
        
        let pagamento = req.body;
        console.log('processando uma requisição de novo pagamento');

        pagamento.status = "CRIADO";
        pagamento.data = new Date();

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        let mencachedClient = new app.services.memcachedClient();

        pagamentoDao.salva(pagamento, (erro, resultado) => {
            if(erros) {
                console.log('erro ao inserir no banco: ' + erros);
                resp.status(400).send(erros);
                return;
            }
            if (erro) {
                console.log('erro no Servidor');
                resp.status(500).send(erro);
            } else {
                pagamento.id = resultado.insertId;
                mencachedClient.set('pagamento-'+pagamento.id, pagamento, 60*1000, (erro) => {
                    if(erro)
                        console.log(erro)
                    else
                        console.log('Nova Chave Adicionada ao Cache: pagamento-'+pagamento.id);
                });
                console.log('pagamento criado');
                resp.location('/pagamentos/pagamento/'+resultado.insertId)

                resp.status(201).json(pagamento);
            }
        });
    });

    app.put('/pagamentos/pagamento/:id', (req, resp) => {

        req.assert("valor", "Valor é Obrigatório").notEmpty();
        req.assert("valor", "Valor deve ser decimal").isFloat();

        let erros = req.validationErrors();

        if(erros)
            console.log(erros);

        let id = req.params.id;
        let pagamento = {};

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamento.id = id;
        pagamento.status = "CONFIRMADO";

        pagamentoDao.update(pagamento, (erro, resultado) => {
            if(erros) {
                console.log('erro ao inserir no banco: ' + erros);
                resp.status(400).send(erros);
                return;
            }
            if(erro) {
                resp.status(500).send(erro);
                return;
            }
            resp.status(200).send(pagamento);
        });
    });

    app.delete('/pagamentos/pagamento/:id', (req, resp) => {
        let id = req.params.id;
        let pagamento = {};

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamento.id = id;
        pagamento.status = "CANCELADO";

        pagamentoDao.delete(pagamento, (erro, resultado) => {
            if(erro) {
                resp.status(500).send(erro);
                return;
            }
            resp.status(204).send(pagamento);
        });
    });
}
