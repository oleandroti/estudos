let http = require('http');

let config = {
    hostname: 'localhost',
    port: '3000',
    path: '/produtos',
    headers: {
        'Accept':'application/json'
    }
}

http.get(config, (res) => {
    res.on('data', (body) => {
        console.log('corpo:' + body);
    })
});
            
