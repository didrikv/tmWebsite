import React from 'react'
import deepEqual from 'deep-equal'

import ControlPanel from '../ControlPanel/ControlPanel.jsx'
import NorwayMap from './NorwayMap.jsx'
import ChartWrapper from '../ChartWrapper/ChartWrapper.jsx'

export default class StaticNorwayMap extends React.Component {
	constructor(props) {
		super()
		this.state = {...this.createInitialState(), ...props}
		this.state.variable = props.varibable ? props.variable : props.options[0]
	}

	createInitialState = () => {
		let defaultState = {
			inndeling: 'Kommune',
			createControl: true,
			hideControl: false,
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
		let name = this.state.variable + ' '
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
			selectVariable: {
				names: this.state.options,
				chosen: this.state.variable,
				handleChange: (variable) => this.setState({variable})
			},
			hide: this.state.hideControl
		}
		if(this.state.chooseControl) {
			let tmp = this.state.chooseControl
			controls.selectYears = tmp.selectYears ? controls.selectYears : undefined
			controls.selectInndeling = tmp.selectInndeling ? controls.selectInndeling : undefined
			controls.selectVariable = tmp.selectVariable ? controls.selectVariable : undefined
		}
		return <ControlPanel {...controls}/>
	}

	render =() => {
		let data = this.aggData.filter( (e) => e.Inndeling == this.state.inndeling)
		let dataobj = {}
		data.forEach( (e) => {
			dataobj[e['Nr']] = e[this.state.variable]
		})
		let controlPanel = this.state.createControl ? this.createControlPanel() : null
		
		return(
			<div>
			{controlPanel}
			<ChartWrapper name={this.generateName()}>
				<NorwayMap 
					{...this.state} 
					data={dataobj} 
				/>
			</ChartWrapper>
			</div>
		)
	}
}

