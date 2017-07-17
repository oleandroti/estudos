class PagamentoDao {
    constructor(connection) {
        this._connection = connection;
    }

    salva(pagamento, callback) {
        this._connection.query('INSERT INTO PAGAMENTOS SET ?', pagamento, callback);
    }

    lista(callback) {
        this._connection.query('SELECT * FROM PAGAMENTOS', callback);
    }

    update(pagamento, callback) {
        this._connection.query('UPDATE PAGAMENTOS SET status = ? WHERE id = ? ', [pagamento.status, pagamento.id], callback);
    }

    delete(pagamento, callback) {
        this._connection.query('DELETE FROM PAGAMENTOS WHERE id = ?', [pagamento.id], callback);
    }

    buscaPorId(pagamento, callback) {
        this._connection.query('SELECT * FROM PAGAMENTOS WHERE id = ?', [pagamento.id], callback);
    }
}

module.exports = function() {
    return PagamentoDao;
};

