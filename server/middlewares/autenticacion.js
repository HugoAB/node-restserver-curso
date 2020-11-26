const jwt = require('jsonwebtoken');

// ===================
// Verificar token
// ===================

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decodedInfo) => {

        if(err) {
            return res.status(401).json({
                ok:false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decodedInfo.usuario;
        next();
    });

}


module.exports = {
    verificaToken
};