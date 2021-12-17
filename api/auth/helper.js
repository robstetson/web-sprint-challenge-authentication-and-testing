const jwt = require('jsonwebtokens')
const jwtSecret = require('../../config/secret')

function helperFunction(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '3d',
    }
    const token = jwt.sign(
        payload,
        jwtSecret,
        options,
    )
    return token

}

module.exports = {
    helperFunction
}