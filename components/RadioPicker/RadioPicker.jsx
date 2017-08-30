import React from 'react'
import {Radio} from 'react-bootstrap'
import styles from '../MultiSelect/MultiSelect.css'

export default function RadioPicker({values, names, chosen, handleChange}){
	values = values ? values : names

	function onChange(event) {
		var chosen = event.target.value
		if(!isNaN(chosen)) {
			chosen = +chosen
		}
		handleChange(chosen)
	}
	return (
		<div className={styles.container}>
			{names.map( (e, i) => 
					<button 
						name={e} 
						value={values[i]} 
						key={values[i]} 
						onClick={onChange}
						className={chosen == values[i] ? styles.buttonChecked: styles.button}
					>
						{e} 
					</button>
			)}
		</div>
	)
}
