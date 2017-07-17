let memcached = require('memcached');

class MemCachedClient {
    constructor() {
        this._cliente = new memcached('localhost:11211', {
            retries: 10,
            retry: 10000,
            remove: true
        });
    }

    set(url, json, time, callback) {
        this._cliente.set(url, json, time, callback);
    }

    get(url, callback) {
        this._cliente.get(url, callback);    
    }
}

module.exports = () => {
    return MemCachedClient;
}