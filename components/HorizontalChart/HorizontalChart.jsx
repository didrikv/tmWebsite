import React from 'react'
import deepEqual from 'deep-equal'

import ControlPanel from '../ControlPanel/ControlPanel.jsx'
import TopBottomHorizontalChart from './TopBottomHorizontalChart.jsx'
import ChartWrapper from '../ChartWrapper/ChartWrapper.jsx'



export default class HorizontalChart extends React.Component {
	constructor(props) {
		super()
		this.state = {...this.createInitialState(), ...props}
	}

	createInitialState = () => {
		let defaultState = {
			inndeling: 'Kommune',
			population: 1000,
			n: 10,
			view: 'top',
			x: 'Navn',
			createControl: true,
			hideControl: false
		}

		return {...defaultState, ...this.props}
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({...this.state, ...nextProps})
	}

	componentWillUpdate = (nextProps, nextState) => {
		if(!deepEqual(nextState.years, this.state.years)) {
			let { createDataObject, data } = this.props.dataStore
			this.aggData = createDataObject(data, nextState.years)			
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		let should = !deepEqual(this.state, nextState)
		return should
	}
	

	componentWillMount = () => {
		let { createDataObject, data } = this.props.dataStore
		this.aggData = createDataObject(data, this.state.years)
	}

	generateName = () => {
		let years = this.state.years
		let top = this.state.inndeling == 'Fylke' ? 'Top ' : 'Top 10 '
		let name = top + this.state.inndeling + ' '
		name += years.length == 1 ? years[0] : years[0] + '-' + years[years.length-1]
		return name
	}

	createControlPanel = () => {
		let controls = {
			selectYears: {
				names: this.props.dataStore.years,
				chosen: this.state.years,
				handleChange: (years) => this.setState({years})
			},
			selectInndeling: {
				names: ['Kommune', 'Region', 'Fylke'],
				chosen: this.state.inndeling,
				handleChange: (inndeling) => this.setState({inndeling})
			},
			selectPopulation: {
				names: ['All', '>1000', '>3000', '>10 000'],
				values: [0, 1000, 3000, 10000],
				chosen: this.state.population,
				handleChange: (population) => this.setState({population})
			},
			hide: this.state.hideControl
		}
		return <ControlPanel {...controls}/>
	}


	
	render() {
		let data = this.aggData.filter( (e) => e.Inndeling == this.state.inndeling)
		if(this.state.inndeling == 'Kommune' && this.state.dataStore.vars.includes("Folketall")) {
			data = data.filter( (e) => e.Folketall >= this.state.population)
		}
		
		let controlPanel = this.state.createControl ? this.createControlPanel() : null
		let fylkekey = this.state.inndeling == "Fylke" ? "Fylke" : "Other"

		return(
			<div key={fylkekey}>
				{controlPanel}
				<ChartWrapper name={this.generateName()}>	
					<TopBottomHorizontalChart 
						{...this.state}
						data={data} 
					/>
				</ChartWrapper>
			</div>
		)
	}
}
