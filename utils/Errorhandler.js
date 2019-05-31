// /function to handle the access token
var jwt = require('jsonwebtoken');
var config = require('../config/database/_namer');
const validateAccessToken=function validateAccessToken(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return handleError(res, 401, 'Token no provided');
    var id;
    jwt.verify(token, config.key, function (err, decoded) {
        if (err) return handleError(res, 500, 'Failed to authenticate');
        id = decoded.id;
    });

    return id;
}

//function to handle error
const handleError=function handleError(res, code, message) {
    res.status(code).json({
        errors: [
            {
                msg: message,
            },
        ],
    });
}

module.exports.handleError=handleError;
module.exports.validateAccessToken=validateAccessToken;