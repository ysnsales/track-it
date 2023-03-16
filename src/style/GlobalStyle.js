import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

body {
	height: 100%;
	background-color: #E5E5E5;
}
	button {

		&:disabled {
			background: #52B6FF;
			opacity: 0.7;
		}
	}
	
`

export default GlobalStyle