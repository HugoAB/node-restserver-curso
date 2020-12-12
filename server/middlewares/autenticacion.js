const { json } = require('body-parser');
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

// ===================
// Verificar si es ADMIN
// ===================
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res
        .json({
            ok: false,
            err: {
                message: 'Acceso denegado. El usuario no es administrador'
            }
        });
    }
}

// ===================
// Verificar token de imagen
// ===================
let verificaTokenImg = (req, res, next) => {
    const token = req.query.token;

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
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
};