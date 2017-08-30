import dataSet from './data/rankData.json'
import {createAuxVars, createDataObject} from '../components/DataUtils/dataUtils.js'

let data = dataSet

let years = Object.keys(data).filter( (e) => e != 'vars' ).map((e) => +e )
let vars = data.vars

let dataStore = {years, vars, data, createDataObject}

export default dataStore
