import React from 'react'
import { VictoryChart, 
	VictoryBar, 
	VictoryLabel, 
	VictoryStack, 
	VictoryTheme, 
	VictoryContainer, 
	VictoryAxis, 
	VictoryLegend } from 'victory'

import theme from './VictoryTheme.js'

export default function HorizontalBarChart(props) {
	let { data, x, stack, colorScale, svgId, reverse } = props
	if(reverse) {
		data = data.slice()
	} else {
		data = data.slice().reverse()
	}
	let names = data.map((e) => e[x])
	let legendData = stack.map( (e) => ({name:e, symbol: {type: 'square'}}))

	console.log(data)
	let varCount = stack.length
	let nameLen = 0
	names.forEach( (e) => {
		nameLen = e.length > nameLen ? e.length : nameLen
	})
	console.log(nameLen)
	console.log(varCount)
	
	let topPadding = 10 + 20*varCount	
	let leftPadding = 5 + 8*nameLen
	let height = 30 + topPadding + names.length * 30
	

	return (
		<div id={svgId}>
		<VictoryChart
			width={650}
			height={height}
			animate={{
				duration: 300, 
				onLoad: {duration: 200}, 
			}}
			domainPadding={{x:[0,0], y:[20,10]}}
			padding={{top:topPadding, bottom:30, left:leftPadding, right: 20}}
			theme={theme}
		>


		<VictoryAxis dependentAxis 
			tickFormat={(tick) => ''}
			style={{ticks:{size:0}, grid:{stroke: 'transparent'}}}
		/>
		
	
		<VictoryAxis 
			crossAxis={false}
			orientation='bottom'
			style={{grid:{stroke: 'transparent'}}}
			tickFormat={(tick) => tick}
		/>
		
		<VictoryStack 
			horizontal={true} 
			labels={names}
			labelComponent={<VictoryLabel x={0} textAnchor='beginning'/>}	
			colorScale={colorScale}
		>
			{stack.map((e, i) => 
				<VictoryBar 
					data={data} 
					x={x} 
					y={e} 
					key={e}
				/>
			)}
		</VictoryStack>

		<VictoryLegend 
			y={-topPadding}
			x={-leftPadding}
			data={legendData}
			colorScale={colorScale}
			gutter={2}
		/>

		</VictoryChart>
		</div>
	)
}
