const jwt = require('jsonwebtoken');
const config = require('../config');
// middleware: function, 3 parameters
// register middleware
function basicAuth(req, res, next) {
    // read
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('Unauthorised');
        return;
    }
    const tokens = authHeader.split(' ');
    const credentialsToken = tokens[1];

    // decode
    const buf = Buffer.from(credentialsToken, 'base64');
    const credentials = buf.toString();
    const credentialsTokens = credentials.split(':');

    const [username, password] = credentialsTokens;

    // validate
    if (username === 'admin' && password === 'password') {
        next();
    } else {
        res.status(401);
        res.send('Unauthorised');
    }
}

function tokenAuth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        const tokens = authorization.split(' ');
        const jwtToken = tokens[1];
        const decoded = jwt.verify(jwtToken, config.jwtSecret);
        req.decodedToken = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorised' });
    }
}

function authoriseAdmin(req, res, next) {
    const { role } = req.decodedToken;
    if (role === 'Admin') next();
    else
        return res
            .status(403)
            .json({ message: 'You are not authorised to perform this operation' });
}

module.exports = {
    basicAuth,
    tokenAuth,
    authoriseAdmin,
};