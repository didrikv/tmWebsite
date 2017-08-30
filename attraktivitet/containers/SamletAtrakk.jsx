import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import article from '../data/SamletAtrakk.json'
import styles from './App.css'
import TwoColumn, {renderSection} from '../../components/TwoColumn/TwoColumn.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'


export default function SamletAtrakk(props) {

	function renderStructureSection() {
		let graphProps = {
			options: ['Forventet Befolkningsvekst', 'Befolkningsvekst', 'Samlet attraktivitet'],
			variable: 'Forventet Befolkningsvekst',
			years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			inndeling: 'Kommune',
			createControl: true,
			hideControl: true,
			dataStore: props.dataStore
		}

		let sections = [
			{ ...article.s2, graphProps: {variable: 'Forventet Befolkningsvekst'} },
			{ ...article.s3, graphProps: {variable: 'Befolkningsvekst'} },
			{ ...article.s4, graphProps: {variable: 'Samlet attraktivitet'} },
			{ ...article.s5, graphProps: {hideControl: false, variable: 'Samlet attraktivitet'} }
		]

		return <TwoColumn 
					height='2000px' 
					graphWidth={8} 
					graph={StaticNorwayMap}
					graphProps={graphProps}
					sections={sections} 
					paddingBottom={200} 
					paddingTop={120}
				/>
	}
	
	function renderFirstSection() {
		let graphProps = {
			stack: ["Forventet Befolkningsvekst", "Bostedsattraktivitet", "Egenvekst Attraktivitet"],
			colorScale:['#9E9E9E', '#8BC34A', '#FFB74D'],
			sortby: "Samlet attraktivitet",
			inndeling: 'Kommune',
			years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
			population: 1000,
			createControl: true,
			hideControl: true,
			dataStore: props.dataStore
		}

		let sections = [
			{ ...article.p3, graphProps: {inndeling: 'Kommune'}},
			{ ...article.p4, graphProps: {inndeling: 'Region'}},
			{ ...article.p5, graphProps: {inndeling: 'Fylke'}},
			{ ...article.p6, graphProps: {hideControl: false, inndeling: 'Fylke'}}
		]

		return <TwoColumn 
					height='2500px' 
					graphWidth={8} 
					sections={sections} 
					graph={HorizontalChart} 
					graphProps={graphProps}
					paddingBottom={200} 
					paddingTop={120}
				/>
	}

	return(
	<Grid>
		<Row>
			{renderSection(article.p1)}
		</Row>
		<Row>
			{renderSection(article.p2)}
		</Row>
		<Row>
			{renderSection(article.s1)}
		</Row>
		<div style={{height: '100px'}}> </div>
		<Row>
			{renderStructureSection()}
		</Row>
		<div style={{height: '200px'}}> </div>
		<Row>
			{renderFirstSection()}
		</Row>
		<div style={{height: '100px'}}> </div>
		<Row>
			{renderSection(article.p7)}
		</Row>
	</Grid>
	)
}
