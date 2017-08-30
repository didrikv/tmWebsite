
function createAuxVars(data, newvars) {
	for(let newvar of newvars) {
		createVar(data, newvar[0], newvar[1])
	}
	return(data)
}

function createVar(data, variable, sum) {
	let years = Object.keys(data).filter( (e) => e != 'vars' ) 
	data.vars.push(variable)
	for(let year of years){
		for(let obs of data[year]){
			let input = 0
			for(let summand of sum){
				input += obs[data.vars.indexOf(summand)]
			}
			obs.push(+input.toFixed(2))
		}
	}
}

function createDataObject(data, years) {
	if(years.length == 1) {
		var variables = data[years[0]]
	} else {
		let count = years.length
		let n = data[years[0]].length
		var variables = Array(n)
		for(let i=0; i<n; i++) {
			let nvar = data.vars.length
			variables[i] = []
			for(let el=0; el<nvar; el++) {
				if(['Inndeling', 'Nr', 'Navn', 'Fylke', 'Region', 'År'].includes(data.vars[el])) {
					variables[i][el] = data[years[0]][i][el]
				} else {
					let input = 0
					for(let year of years) {
						input += data[year][i][el]
					}
					variables[i][el] = +(input/count).toFixed(2)
				}
			}
		}
	}
	let dataobj = variables.map( (e) => {
		let obs = {}
		for(let i in data.vars) {
			obs[data.vars[i]] = e[i]
		}
		obs['År'] = years
		return(obs)
	})
	return dataobj
}

export {createAuxVars, createDataObject}
