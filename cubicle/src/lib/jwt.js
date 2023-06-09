//jwt is not promise based syntax(can use callbach instead), so we promisify it 
const jsonwebtoken = require('jsonwebtoken')
const { promisify } = require('util')

const jwt = {
    sign: promisify(jsonwebtoken.sign),
    veify: promisify(jsonwebtoken.verify)
}
module.exports = jwt