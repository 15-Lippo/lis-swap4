import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperfluidStream from './components/SuperfluidStream';
import Distribute from './components/distribute/Distribute';
import Stream from './components/stream/Stream';
import Swap from './components/swap/Swap';
import Withdraw from './components/withdraw/Withdraw';

function App() {
  return (
    <Router>
      <Routes>
         <Route path='*' element={<SuperfluidStream />} />
         <Route path='/swap/*' element={<Swap />} />
         <Route path='/withdraw/*' element={<Withdraw />} />
         <Route path='/stream/*' element={<Stream />} />
         <Route path='/distribute/*' element={<Distribute />} />
      </Routes>
    </Router>
  );
}
import React from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public';
import { Web3Modal } from '@web3modal/react';
import AppRoutes from './AppRoutes';

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [],
  transports: {
      [mainnet.id]: publicProvider(),
      [sepolia.id]: publicProvider(),
  },
})

function App() {
    return (
    <WagmiConfig config={config}>
        <AppRoutes />
        <Web3Modal projectId={"YOUR_PROJECT_ID"} />
    </WagmiConfig>
    );
}

export default App;
