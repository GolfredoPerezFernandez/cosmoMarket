import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '@rainbow-me/rainbowkit/styles.css';
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { Chain, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MoralisProvider } from "react-moralis";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const theme = createTheme({
  typography: {
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(',')},
  palette: {
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#0e76fd"
    }
  }
});

const polygonChain: Chain = {
  id: 137,
  name: 'Polygon',
  network: 'polygon',
  iconUrl: 'https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Matic',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: 'https://polygon-rpc.com/',
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    etherscan: { name: 'PolygonScan', url: 'https://polygonscan.com' },
  },
};

const mumbaiChain: Chain = {
  id: 19,
  name: 'Songbird',
  network: 'songbird',
  iconUrl: 'https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'SGB',
    symbol: 'SGB',
  },
  rpcUrls: {
    default: 'https://songbird.towolabs.com/rpc',
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://explorer-mumbai.maticvigil.com/' },
  },
};



const { provider, chains } = configureChains(
  [ polygonChain ],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const client = createClient({
  provider,
  autoConnect: true,
  connectors,
});

root.render( 
  <StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider coolMode chains={chains}>
        <ThemeProvider theme={theme}>
          <MoralisProvider
            appId="Ule3vKGffPvCeljv5O1GMC28a3A7OGebTRQZmDhG"
            serverUrl="https://e7e8lhnsdker.usemoralis.com:2053/server"
          >
          <Router>
            <App />
          </Router>
    </MoralisProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
