var express         = require('express')
var app             = express()
var bodyParser      = require('body-parser');
var path            = require('path');
var exphbs          = require('express-handlebars');
var expressSession  = require('express-session');
var cookieParser    = require('cookie-parser');
var path            = require('path');
var multer          = require('multer');
var server          = null
var path            = require('path');
var helpers         = require('./server/modules/helpers')
var fs              = require('fs')
var http            = helpers.isProduccion() ? require('http') : require('https')

// CONFIGURAR HTTPS
if (!helpers.isProduccion()) {
    console.log('Ambiente de pruebas')
    server = http.createServer({
        key: fs.readFileSync(path.join('server', 'assets', 'key.pem')),
        cert: fs.readFileSync(path.join('server', 'assets', 'cert.pem'))
    }, app)
} else {
    console.log('Ambiente de producción')
    server = require('http').createServer(app)
}

// CONFIGURAR SOCKET IO
io = require('socket.io').listen(server)
nsp = io.of('/' + global.sistema + '/')

// CONFIGURAR REDIS
var RedisStore = require('connect-redis')(expressSession)
var redis = require('redis')
var client = redis.createClient()

// LEER FORMATOS JSON
app.use(bodyParser.json());
app.use(bodyParser());
app.use(cookieParser());
// app.use(expressSession({secret:'dsadsad67782g3y138217y38178ui'}));

app.use(expressSession({
    secret: '68dsfba78fs78dsfs78dfasd7f',
    store: new RedisStore({ host: '127.0.0.1', port: 6379, client: client }),
    saveUninitialized: false,
    resave: false
}))

// ACTIVAR CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// PUERTO DONDE ESCUCHARA LA APP
PUERTO = 3003;

// CARPETA PUBLICA
app.use(express.static(__dirname + '/public'));

app.engine('.hbs', exphbs({
	layoutsDir: path.join(__dirname, "./client/views/layouts"),
  defaultLayout: 'main',
  extname: 'hbs'
}));

app.set('view engine', '.hbs');
app.set('views', __dirname + '/client/views');

// DEFINE ROUTES
var navRoute = require("./server/routes/nav");
app.use('/', navRoute);

var homeRoute = require("./server/routes/home");
app.use('/home', homeRoute);


app.set('port', process.env.PORT || PUERTO)

app.start = app.listen = function() {
    console.log('Escuchando desde el puerto ' + PUERTO)
    return server.listen.apply(server, arguments)
}

app.start(app.get('port'))
