import React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import styles from "./CrossFade.css"

export default function FadeTransition(props) {
	return(
	  <CSSTransition
		classNames={{
			enter: styles.enter,
			enterActive: styles.enterActive,
			exit: styles.exit,
			exitActive: styles.exitActive
		}}
		{...props}
		timeout={{ enter: 300, exit: 300 }}
	  >
	  {props.children}
	  </CSSTransition>
	)
}

