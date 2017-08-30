import React from 'react'
import {
	BootstrapTable,
	TableHeaderColumn
	} from 'react-bootstrap-table'
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

export default function Table(props) {
	let {dataStore, graphProps, years, variables, inndeling} = props
	let {data, createDataObject} = dataStore

	data = createDataObject(data, years)
	data = data.filter( (e) => e.Inndeling == inndeling)

	let dataCols = variables.map( (e) =>
		<TableHeaderColumn 
			dataField={e} 
			key={e} 
			dataSort 
			thStyle={{
			}} 
		> 
			{e} 
		</TableHeaderColumn>
	)


	return(
		<BootstrapTable 
			data={data}
			striped
			pagination
			condensed
			headerStyle={{ 
			}}
		>
			<TableHeaderColumn dataField="Nr" isKey={true} dataSort > Nr </TableHeaderColumn>
			<TableHeaderColumn dataField="Navn" dataSort > Navn </TableHeaderColumn>
			{dataCols}
		</BootstrapTable>
	)
}

	



