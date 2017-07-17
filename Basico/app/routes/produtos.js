let produto = {
    titulo : 'mais sobre node',
    descricao: 'node, javascript e um pouco sobre http',
    preco: '100'
}

module.exports = (app) => {
    app.get('/produtos', (req, resp) => {
        resp.format({
            html: () => {
                resp.render("produtos/lista");            
            },
            json: () => {
                resp.json({
                    retorno : {
                        teste : produto
                    } 
                })
            }
        });
    });

    app.get('/produtos/form', (req, resp) => {
        resp.render("produtos/form");
    })

    app.post('/novoProduto', (req, resp) => {
            app.get('io').emit('novaPromocao', {teste: 'teste'})
            resp.redirect('produtos/form')
    })
}
