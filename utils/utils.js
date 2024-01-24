const jwt = require('jsonwebtoken');
const JWT_SECRET = "IRFAN_NAWAZ_SHHH"

const generateToken = (userId) => {
    console.log({ userId })
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30m' })
}

module.exports = { generateToken, JWT_SECRET }