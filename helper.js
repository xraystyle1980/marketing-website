const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const DOMAIN = process.env.DOMAIN || "localhost"
const PORT = process.env.PORT || 3000

var mongopath = process.env.MONGOURL || "mongodb://localhost:27017/marketing-website"
var url = `${DOMAIN}:${PORT}`

module.exports = { url, mongopath }
