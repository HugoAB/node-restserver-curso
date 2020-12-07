
// ===================
// Puerto
// ===================
process.env.PORT = process.env.PORT || 8050;

// ===================
// Entorno
// ===================
process.env.NODE_ENV = process.env.NODE_ENV  || 'dev';

// ===================
// Vencimiento del Token
// ===================
process.env.CADUCIDAD_TOKEN = '48h';

// ===================
// Seed(secret) de autenticacion
// ===================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// ===================
// Base de datos
// ===================
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGODB_URI;
}

process.env.URLDB = urlDB;


// ===================
// Google Client ID
// ===================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1042278087040-8sn6oh3cto5hghrc6d5sjii104me8rl4.apps.googleusercontent.com';