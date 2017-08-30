import React from 'react'

import styles from './App.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import categories from '../data/categories.json'


function Header(props) {
	return(
		<div>
			<div className={styles.header} >
				<p> Telemarksforskning </p>
				<h1> Kulturindeksen</h1> 
				<p> HVOR ER DET KULTUR? </p>
				<p> av  <a href='http://www.tmforsk.no/medarbeidere/Detalj.asp?id=80&merket=6'> Bård Kleppe</a> </p>
			</div>

			<Navbar bsStyle='default' staticTop>
				<div className={styles.navbar}>
					<Nav>
						<LinkContainer exact to="/">
							<NavItem> Hovedresultater </NavItem>
						</LinkContainer>
						<LinkContainer exact to="/analyser">
							<NavItem> Analyer </NavItem>
						</LinkContainer>
						<NavDropdown title="Kategorier" id="nav-dropdown">
							{categories.map( (e) => 
								<LinkContainer 
									to={'/kategori/' + e.title.toLowerCase()}
									key={e.title}
								>
									<MenuItem> {e.title} </MenuItem>
								</LinkContainer>
							)}
						</NavDropdown>
					</Nav>
				</div>
			</Navbar>
		</div>
	)
}

export default Header
