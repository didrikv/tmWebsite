import React from 'react'
import categories from '../data/categories.json'
import {Route} from 'react-router-dom'
import styles from '../../components/TwoColumn/TwoColumn.css'
import Table from '../../components/Table/Table.jsx'
import {Row, Col, Grid} from 'react-bootstrap'
import StaticNorwayMap from '../../components/Map/StaticNorwayMap.jsx'
import TopRang from './TopRang.jsx'
import RadioPicker from '../../components/RadioPicker/RadioPicker.jsx'
import HorizontalChart from '../../components/HorizontalChart/HorizontalChart.jsx'



export default class Kategori extends React.Component {

	constructor(props) {
		super()
		this.state = {...props}
		this.state.inndeling='Kommune'
		this.state.years=[2015]

	}

	renderControls = () => {
		return(
			<div style={{width: '50rem', margin: 'auto'}}>
			<RadioPicker
				names={['Kommune', 'Region', 'Fylke']}
				chosen={this.state.inndeling}
				handleChange={ (inndeling) => this.setState({inndeling}) }
			/>
			<RadioPicker
				names={this.state.dataStore.years}
				chosen={this.state.years}
				handleChange={ (years) => this.setState({years: [+years]}) }
			/>
			</div>
		)
	}


	renderKategori = (i) => {

		let tableProps = {
			variables: categories[i].variables
		}

		let mapProps = {
			options: categories[i].variables,
			chooseControl: {
				selectVariable: true
			}
		}

		let chartProps = {
			dataStore: this.state.rankStore,
			stack: categories[i].variables,
			sortby: categories[i].title,
			view: 'bottom',
			reverse: true,
			createControl: false,
		}




		return(
			<Grid>

				<Row>
					<div className={styles.section}>
						<h3 className={styles.header}> { categories[i].title } </h3>
						<p className={styles.paragraph}> { categories[i].text } </p>
					</div>
				</Row>
						<div style={{height: '100px'}}> </div>
						<hr/>
				<Row>
					{this.renderControls()}
				</Row>
						<div style={{height: '100px'}}> </div>
				<Row>
					<Col sm={6} >
						<StaticNorwayMap {...this.state} {...mapProps} />
					</Col>
					<Col sm={6} >
						<div style={{height: '90px'}}> </div>
						<HorizontalChart {...this.state} {...chartProps} />
					</Col>
				</Row>
						<div style={{height: '100px'}}> </div>
				<Row>
					<Table {...this.state} {...tableProps} />
				</Row>
			</Grid>
		)
	}
	
	render() {
		let url = this.state.match.url
		return(
			<div>
				{categories.map( (e, i) =>
					<Route 
						path={url + '/' + e.title.toLowerCase()}
						render={() => this.renderKategori(i)}
						key={i}
					/>
				)}
			</div>
		)
	}
}
