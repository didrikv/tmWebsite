import React from 'react'
import { 
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom'

import Header from './Header.jsx'
import SamletAtrakk from './SamletAtrakk.jsx'
import Bostedsattraktivitet from './Bostedsattraktivitet.jsx'
import Naringsattraktivitet from './Naringsattraktivitet.jsx'
import Befolkningsframskriving from './Befolkningsframskriving.jsx'

export default function App(props) {
	const attrak = (routeProps) => <SamletAtrakk {...props} {...routeProps}/>
	const naring = () => <Naringsattraktivitet {...props}/>
	const bosted = () => <Bostedsattraktivitet {...props}/>
	const framskriving = () => <Befolkningsframskriving {...props}/>
	const layout = () => <Layout {...props}/>

	return(
		<div>
		<Router
			basename="/attraktivitet"
		>
		<div>
			<Header />
			<div>
			<Route exact path='/' render={attrak} />
			<Route path='/bosted' render={bosted} />
			<Route path='/naring' render={naring} />
			<Route path='/scenarier' render={framskriving} />
			<Route path='/dashboard' render={layout} /> 
			</div>
		</div>
		</Router>
		</div>
	)
}


