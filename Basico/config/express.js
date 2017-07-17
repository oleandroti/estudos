let app = require('express')();
let load = require('express-load');
let bodyParser = require('body-parser');

module.exports = () => {
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    load('routes', {cwd:'app'}).into(app);
    app.use((req, res, next) => {
        res.status(404).render('404'); 
        next;
    });

    return app;
}