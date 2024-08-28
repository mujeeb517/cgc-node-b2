
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


module.exports = {
    basicAuth
};