let fs = require('fs');

fs.createReadStream('exemplo.pdf')
    .pipe(fs.createWriteStream('exemplo2.pdf')
    .on('finish', (err) => console.log('Arquivo escrito com stream')));