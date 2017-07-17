var cluster = require('cluster');
var os = require('os');

let cpus = os.cpus();

console.log('Executando uma thread');

if(cluster.isMaster) {
    console.log('Thread Master');

    cpus.forEach(() => {
        cluster.fork();
    })

    cluster.on('listening', (worker) => {
        console.log('Cluster conectado '+ worker.process.pid);
    });

    cluster.on('exit', worker => {
        console.log('Cluster %d desconetado', worker.process.pid)
        cluster.fork();
    })
}
else {
    console.log('Thread Slave');
    require('./index.js');
}