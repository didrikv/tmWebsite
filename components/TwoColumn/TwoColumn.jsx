import React from 'react'
import styles from './TwoColumn.css'
import Waypoint from 'react-waypoint'
import {Row, Col, Fade} from 'react-bootstrap'
import {AutoAffix} from 'react-overlays'

export default class TwoColumn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: 0, 
			fade: false, 
			graphProps: props.graphProps
		}
	}

	handleEnter = (i) => {
		let graphProps =  {...this.props.graphProps, ...this.props.sections[i].graphProps}
		this.setState({active: i, graphProps})
	}
	
	
	renderSections = () => {
		let sections = this.props.sections.map( (e, i) => {
			let sClass  = this.state.active == i ? styles.active : styles.passive
			return(
				<Waypoint 
					onEnter={(e) => this.handleEnter(i)}  
					bottomOffset='49.999%' 
					topOffset='50%' 
					key={i} 
					fireOnRapidScroll={false}
				>
					<div className={sClass}>
						<h3 className={styles.header}> 
							{this.props.sections[i].title} 
						</h3>
						<p className={styles.paragraph}> 
							{this.props.sections[i].text} 
						</p> 
					</div>
				</Waypoint>
			)
		})

		return (
			<div 
				style={{
					height: this.props.height, 
					paddingTop: this.props.paddingTop, 
					paddingBottom: this.props.paddingBottom
				}} 
				className={styles.container}
			> 
				{sections} 
			</div>
		)
	}
	
	renderChart = () => {
		return(
			<div style={{height: this.props.height}}>
				<AutoAffix container={this} viewportOffsetTop={20}>
				<div>
					<this.props.graph {...this.state.graphProps}/>
				</div>
				</AutoAffix>
			</div>
		)
	}

	render() {
		return(
			<Row>
				<Col sm={this.props.graphWidth}>
					{this.renderChart()}
				</Col>
				<Col sm={12 - this.props.graphWidth}>
					{this.renderSections()}
				</Col>
			</Row>
		)
	}
}

export function renderSection(section) {
	if(Array.isArray(section.text)) {
		var paragraph = section.text.map( (e,i) => 
			<p className={styles.paragraph} key={i}> {section.text[i]} </p>
		)
	} else {
		var paragraph = <p className={styles.paragraph}> {section.text} </p>
	}
	return(
		<div>	
			<div className={styles.section}>
				<h3 className={styles.header}> {section.title} </h3>
				{paragraph}
			</div>
		</div>
	)
}

