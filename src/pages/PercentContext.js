import { createContext, useState } from 'react';

export const PercentContext = createContext();

export const PercentProvider = (props) => {
    const [percent, setPercent] = useState(0)
    return (
        <PercentContext.Provider value={{percent, setPercent}}>
            {props.children}
        </PercentContext.Provider>
    )
}

