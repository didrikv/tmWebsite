const express = require("express")
var expressStaticGzip = require("express-static-gzip")
const app = express()

app.use(expressStaticGzip(__dirname + "/public"))
app.use(expressStaticGzip(__dirname))

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

app.get('/attraktivitet/*', (req, res) => {
	res.sendFile(__dirname + "/public/attraktivitet/index.html")
})

app.get('/kultur/*', (req, res) => {
	res.sendFile(__dirname + "/public/kultur/index.html")
})

app.listen(3000, () => {
	console.log("Server running, and listening on port 3000")
})
