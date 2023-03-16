import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	button {

		&:disabled {
			background: #52B6FF;
			opacity: 0.7;
		}
	}
	
`

export default GlobalStyle