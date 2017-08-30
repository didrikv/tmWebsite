import React from 'react'
import { Fade } from 'react-bootstrap'

import styles from './ControlPanel.css'
import MultiSelect from '../MultiSelect/MultiSelect.jsx'
import RadioPicker from '../RadioPicker/RadioPicker.jsx'


function ControlPanel({ selectYears, selectInndeling, selectPopulation, selectVariable, hide}) {

	if(selectPopulation) { var populationClass = selectInndeling.chosen == 'Kommune' ? styles.show : styles.hide }
	let displayClass = hide ? styles.hide : styles.show
	
	selectPopulation = selectPopulation ? <div className={populationClass}> <RadioPicker {...selectPopulation} /> </div> : null
	selectYears = selectYears ? <MultiSelect {...selectYears}/> : null
	selectInndeling = selectInndeling ? <RadioPicker {...selectInndeling} /> : null
	selectVariable = selectVariable ? <RadioPicker {...selectVariable} /> : null


	
	return(
				<div className={displayClass}>
				<div className={styles.header}>
					{selectYears ? selectYears : selectVariable}
					<div className={styles.row}>
					{selectInndeling}
					{selectPopulation}
					{selectYears ? selectVariable : null}
					</div>
				</div>
				</div>
	)
}

export default ControlPanel
