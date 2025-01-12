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
  const projectId = "24277ef4e51151460d840217d95230bf" // Sostituisci con il tuo project ID
    return (
    <WagmiConfig config={config}>
        <AppRoutes />
        <Web3Modal projectId={projectId} />
    </WagmiConfig>
    );
}

export default App;
