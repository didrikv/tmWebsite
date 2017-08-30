import React from 'react'
import styles from './Map.css'

export default function MapLegend({ colors, threshold, borderColor, x, y }) {
	let rectDim = 20
	let rects = colors.map( (e, i) => 
		<rect 
			width={rectDim}
			height={rectDim}
			x={0}
			y={i*rectDim}
			key={i}
			className={styles.static}
			style={{fill:e, stroke:'grey', strokeWidth:0.4}}
		/>
	)

	let text = threshold.map( (e, i) =>
		<text 
			x={rectDim + 5} 
			y={rectDim*(i)}
			alignmentBaseline='middle'
			key={i}
			fontFamily='Arial, Helvetica, sans-serif'
			fill={borderColor}
			style={{fontSize:'10px'}}
		>
			{Math.round(e*Math.pow(10,2))/Math.pow(10,2)} 
		</text>
	)

	let translate = 'translate(' + x + ', ' + y + ')'

	return(
		<g transform={translate}>
			{rects}
			<g key={threshold[0]}>
				{text}
			</g>
		</g>
	)
}
