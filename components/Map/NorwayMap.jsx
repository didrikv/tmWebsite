import React from 'react'
import { feature } from 'topojson'
import {min, max, scaleQuantile, scaleLinear, scaleQuantize, geoTransverseMercator, geoPath} from 'd3'
import {TransitionGroup} from 'react-transition-group'

import norge_simp from './norway_simple.json'
import MapLegend from './MapLegend.jsx'
import styles from './Map.css'
import FadeTransition from '../CrossFade/CrossFade.jsx'

let projection = geoTransverseMercator()
  .rotate([-15, -65, 0])
  .translate([450/2, 450/2])
  .scale(2000)

let path = geoPath()
  .projection(projection)

let norge = norge_simp
let maps = {}

maps.Kommune = feature(norge, norge.objects.kommune).features
maps.Region = feature(norge, norge.objects.region).features
maps.Fylke = feature(norge, norge.objects.fylke).features

let inndelinger = ['Kommune', 'Region', 'Fylke']
inndelinger.forEach( (inndeling) => {
  maps[inndeling] = maps[inndeling].map( (area) => 
    <path
      vectorEffect='non-scaling-stroke'
      d={path(area)}
      key={area.properties.Nr}
      style={{stroke: 'grey', strokeWidth: 0.4}}
	  className={styles.static}
    />
  )
})

export default function NorwayMap({ inndeling, data, svgId }) {
  let areas = inndeling ? maps[inndeling] : maps.Kommune
  let colors = ['#CA0020', '#F4A582', '#b29fa9', '#92C5DE', '#0571B0']

	Object.keys(data).forEach( (key) => {
		if(!data[key]){
			delete data[key]
		}
	})
  
  if(data) {
		var array = Object.keys(data).map(
			function ( key ) { return data[key]; }
		)
    var scale = scaleQuantile()
      .domain(array)
      .range(colors)
    areas.forEach( (e) => {
			if(data[e.key]) {
				e.props.style.fill = scale(data[e.key])
			} else {
				e.props.style.fill = "#e9e9e9"
			}
				
    })
  }

  let threshold = [min(array), ...scale.quantiles(), max(array)]

  return (
		<div style={{position: 'relative'}} id="sdff">
			<TransitionGroup>
				<FadeTransition key={inndeling}>
					<svg
						width='100%'
						height='100%'
						viewBox='44 -3 373 467'
						className={styles.map}
						id={svgId}
					>
						{areas}
					<MapLegend colors={colors} threshold={threshold} x={280} y={250} borderColor='gray'/>
					</svg>
				</FadeTransition>
			</TransitionGroup>
		</div>
  )
}
