import React from 'react';

import Routes from './routes';

import { InfoProvider } from './providers/InfoProvider'

function App() {
    return (
        <InfoProvider>
            <Routes />
        </InfoProvider>
    );
}

export default App;
