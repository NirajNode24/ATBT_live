const { JWT_SECRET } = require('../utils/utils')
const jwt = require("jsonwebtoken")

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        return decoded;
    } catch (error) {
        throw new Error(`Invalid token ${error}`);
    }
}

function extractUserIDFromToken(decodedToken) {
    console.log(decodedToken, "dc")
    if (decodedToken && decodedToken.userId) {
        return decodedToken.userId;
    } else {
        throw new Error("Invalid or missing user ID in token");
    }
}

function authVerify(req, res, next) {
    const token = req.headers.authorization;
    console.log(req.headers)
    try {
        const decoded = verifyToken(token);
        console.log(decoded)
        const userId = extractUserIDFromToken(decoded);
        console.log(userId, 'userID')
        req.user = { userId };
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorised access, please add the token" })
    }
}

module.exports = authVerify;