import React from 'react';
import ReactDOM from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// TonConnect UI
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Rainbow Kit
import './polyfills';

// Telegram Mini App SDK
import WebApp from '@twa-dev/sdk';

// App + Styles
import App from './App';
import './ESIMList.css';

// Hide the main button
WebApp.MainButton.hide();
// Expand the Telegram Mini App to full screen
WebApp.expand();
// Initialize the Telegram Mini App SDK
WebApp.ready();
// Enable the closing confirmation
WebApp.enableClosingConfirmation();


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <TonConnectUIProvider manifestUrl="https://softstack.github.io/telegram-mini-app/tonconnect-manifest.json">
                <App />
            </TonConnectUIProvider>
        </Provider>
    </React.StrictMode>
);
