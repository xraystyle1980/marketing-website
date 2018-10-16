const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '.env')});
const DOMAIN = process.env.DOMAIN || "localhost"
const PORT = process.env.PORT || 3000

var url = `${DOMAIN}:${PORT}`
var mongopath = process.env.MONGOURL

module.exports = { url, mongopath }
