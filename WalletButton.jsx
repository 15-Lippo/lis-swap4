 import React, { useEffect } from "react";
 import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
 import { ConnectButton } from "@web3modal/react";

 function WalletButton() {
     const { address, isConnected } = useAccount()
     const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
     const { disconnect } = useDisconnect()
     const { data, isError, isLoading: ensLoading } = useEnsName({
       address,
     })


     return (
       <div>
         {isConnected ? (
           <div>
              {ensLoading ? 'Fetching ENS Name' : <div>
                {data ? `${data}` : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
               <button onClick={disconnect}>Disconnect</button>
                 </div>
                 }
           </div>
         ) : (
             <ConnectButton/>
         )}
       </div>
     )
   }
   export default WalletButton
