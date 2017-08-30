import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { v4 } from 'uuid'

import info from './info.svg'
import styles from './ChartWrapper.css'
import Download from '../Download/Download.jsx'

export default function ChartWrapper({ info, name, children }) {
	const svgId = v4()

	if(info) {
		const infotab = 
			<Popover title='Forklaring for grafen:' id='pop-focus'>
				{info}
			</Popover>

		var infoButton = 
			<OverlayTrigger 
				trigger='click' 
				rootClose 
				overlay={infotab} 
				placement='right'
			>
				<div>
					<input className={styles.svgButton} type='image'  src={info}/>
				</div>
			</OverlayTrigger>
	} else { 
		var infoButton = null
	} 

	return(
		<div className={ styles.container}>
			<div className={styles.header}>
				<div className={styles.right}> </div>
				<p className={styles.title}> {name} </ p>
				<div className={styles.btnContainer}>
					{infoButton}
					&emsp;
					<Download svgId={svgId} />
				</div>
			</div>
			
			<div className={styles.chartContainer}>
				{React.cloneElement(children, {svgId})}
			</div>
		</div>
	)
}

