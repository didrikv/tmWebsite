import dataSet from './data/data.json'
import {createAuxVars, createDataObject} from '../components/DataUtils/dataUtils.js'

let newvars = [
	['Egenvekst',['Egenvekst Attraktivitet', 'Egenvekst Struktur', 'Egenvekst Offentlig']],
	['Arbeidsplasseffekt', ['Egenvekst Attraktivitet', 'Egenvekst Struktur', 'Egenvekst Offentlig', 'Nabovekst']],
	['Bostedsstruktur', ['Størrelse', 'Arbeidsmarkedintegrasjon', 'Intern Arbeidsmarkedintegrasjon']],
	['Næringsstruktur', ['Befolkningseffekt', 'Bransjeeffekt',]],
	['Samlet struktur', ['Størrelse', 'Arbeidsmarkedintegrasjon', 'Intern Arbeidsmarkedintegrasjon',
		'Egenvekst Struktur', 'Egenvekst Offentlig', 'Nabovekst']],
	['Samlet attraktivitet', ['Bostedsattraktivitet', 'Egenvekst Attraktivitet']],
	['Forventet Flytting', ['Bostedsstruktur', 'Innvandringsbidrag']],
	['Samlet Forventet Flytting', ['Samlet struktur', 'Innvandringsbidrag']],
	['Forventet Befolkningsvekst', ['Samlet Forventet Flytting', 'Fødselsoverskudd']]
]

const data = createAuxVars(dataSet, newvars)
let years = Object.keys(data).filter( (e) => e != 'vars' ).map((e) => +e )
let vars = data.vars

let dataStore = {years, vars, data, createDataObject}

export default dataStore

