import React, { useState, useEffect, createContext } from 'react';

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [dados, setDados] = useState([]);
    return (
        <InfoContext.Provider value={{ dados, setDados }}>
            {children}
        </InfoContext.Provider>
    );
}

export default InfoContext;
