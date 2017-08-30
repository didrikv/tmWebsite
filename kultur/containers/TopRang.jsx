import React from 'react'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'



export default function TopRang(props) {
	let {variables, years, dataStore, inndeling} = props
	let {data, createDataObject} = dataStore
	data = createDataObject(data, years)
	console.log(inndeling)
	console.log(data)
	data = data.filter( (e) => e.Inndeling == inndeling)
	console.log(data)

	let obj = {}
	variables.forEach( (variable) => {
		obj[variable] = {}
		obj[variable].array = data.map( (e) => e[variable] )
		obj[variable].sorted = obj[variable].array.slice().sort().reverse()
		obj[variable].ranked = obj[variable].array.map( (e) => obj[variable].sorted.indexOf(e))
	})

	let dataobj = data.map( (e,i) => {
		let temp = {}
		temp.Navn = e.Navn
		temp.Nr = e.Nr
		temp.Folketall = e.Folkemengde
		temp.Inndeling = e.Inndeling
		let s = 0
		variables.forEach( (variable) => {
			temp[variable] = obj[variable].ranked[i]
			s += obj[variable].ranked[i]
		})
		temp.Total = s
		return temp
	})


	dataStore = {
		data: dataobj,
		createDataObject: (tmp, years) => tmp
	}

	return(
		<HorizontalChart 
			{...props}
			population={0}
			createControl={false}
			dataStore={dataStore} 
			stack={variables}
			sortby="Total"
			view="bottom"
			reverse={true}
		/>
	)

}
