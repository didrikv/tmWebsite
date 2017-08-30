import React from 'react'
import HorizontalBarChart from './HorizontalBarChart.jsx'

export default function TopBottomHorizontalChart(props) {
	let { data, sortby, n, view } = props
	data = data.slice()
	data.sort((a, b) => b[sortby] - a[sortby])

	if(props.inndeling == "Fylke") {
		n = 19
	}

	if(view == 'top') {
		data = data.slice(0,n)
	} else if(view == 'bottom') {
		data = data.slice(-n)
	} else {
		data = data.slice(0,n)
			.concat(generateDummy(data[0]))
			.concat(data.slice(-n))
	}
	
	return(
			<HorizontalBarChart 
				{...props} 
				data={data}
			/>
	)
}

function generateDummy(element) {
	let dummy = {}
	Object.keys(element).forEach( 
		(key) => {
			dummy[key] = isNaN(element[key]) ? '' : 0
		}
	)
	return dummy
}
