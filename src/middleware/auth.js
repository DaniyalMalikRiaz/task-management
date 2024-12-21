const jwt = require('jsonwebtoken');

module.exports = (requiredRoles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

        try {
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

        //    console.log(req.user)
            if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
                return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
            }

          
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({ error: 'Token is not valid' });
        }
    };
};
