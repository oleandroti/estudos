let fs = require('fs');

module.exports = (app) => {

    app.post('/upload/imagem', (req, resp) => {
        console.log('Recebendo Imagem');

        let filename = req.headers.filename;
        console.log(filename);

        req.pipe(fs.createWriteStream('util/'+filename)).on('finish', (error) => {
            resp.status(201).send('Finalizado');
            return;
        });
    });
}