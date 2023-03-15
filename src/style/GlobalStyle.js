import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	button {

		
		&:disabled {
			background-color: lightgray;
		}
	}
	
`

export default GlobalStyle