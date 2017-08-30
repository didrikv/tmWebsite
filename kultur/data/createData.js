let inputfile = require("./WebInput").data
let fs = require('fs')

let rows = inputfile.split("\n")
let data = {}
data.vars = rows[0].split(",")
console.log(data.vars)

for(let i = 1; i < rows.length; i++) {
	let row = rows[i].split(",")
	for(let e in row) {
		row[e] = row[e] === "" || isNaN(row[e]) ? row[e] : +row[e]
	}
	let year = row[data.vars.indexOf("År")]
	if(!data[year]) {data[year]=[]}
	data[year].push(row)
}

fs.writeFileSync("./data.json", JSON.stringify(data), 'utf-8')
