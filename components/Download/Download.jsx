import React from 'react'
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import {saveAs} from 'file-saver'
import { saveSvgAsPng } from 'save-svg-as-png'

import styles from '../ChartWrapper/ChartWrapper.css'
import download from './download.svg'

export default class Download extends React.Component {
	constructor() {
		super()
		this.state = {showModal: false, value:1000}
	}

	open = () => {
		this.setState( {showModal:true} )
	}

	close = () => {
		this.setState( {showModal:false} )
	}

	onClick = () => {
		this.setState( {showModal: true} )
	}

	png = () => {
		let svg = document.getElementById(this.props.svgId)
		if(svg.nodeName != 'svg') {svg = svg.firstChild}
		let viewBox = svg.getAttribute('viewBox').split(' ').map( (e) => +e)
		let scale = this.state.value/viewBox[2]
		saveSvgAsPng(svg, 'map.png', {
			left: viewBox[0], 
			top: viewBox[1], 
			width: viewBox[2], 
			height: viewBox[3], 
			scale:scale
		})
	}

	svg = () => {
		let svg = document.getElementById(this.props.svgId)
		let blob = new XMLSerializer().serializeToString(svg)
		let svg_blob = new Blob([blob],
			               {'type': 'image/svg+xml'})
		saveAs(svg_blob, 'map.svg')
	}

	onChange = (event) => {
		let value = event.target.value
		this.setState( {value:value} )
	}



	render() {
		return(
			<div>
				<input 
					className={styles.svgButton} 
					type='image' 
					src={download} 
					height='30px' 
					onClick={this.onClick} 
				/>
				<Modal show={this.state.showModal} onHide={this.close} bsSize='small'>
					<Modal.Header closeButton>
						<Modal.Title> Last ned som: </Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Button onClick={this.svg}> SVG</Button>
							<hr />
							<Form inline>
								<Button onClick={this.png}> PNG </Button>
								&emsp; <b>Resolution:</b> &ensp;
								<FormControl 
									type='number' 
									value={this.state.value} 
									onChange={this.onChange} 
									style={{width: '100px'}}
								/>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		)
	}
}
