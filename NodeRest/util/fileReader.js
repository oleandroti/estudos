let fs = require('fs');

fs.readFile('imagem.jpg', (error, buffer) => {
    console.log('Arquivo Lido');

    fs.writeFile('imagem2.jpg', buffer, (err) => console.log('Arquivo escrito'))

});