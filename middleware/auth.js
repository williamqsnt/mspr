// Exemple de middleware auth.js
const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWTSECRET;

const authorized = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWTSECRET);

        const userId = decodedToken.userId;
        const userRole = decodedToken.role;

        req.auth = { userId, userRole };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Bad User ID';
        } else if (req.body.requiredRole && req.body.requiredRole !== userRole) {
            throw 'Role unauthorized';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({ error: error || 'Requ need auth token' });
    }
};

module.exports = authorized;
