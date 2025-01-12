import React, { useState } from 'react';
 import { useAccount, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi';
 import { ethers } from 'ethers';
 import TokenABI from '../abis/Token.json' // Sostituisci con il tuo percorso


 function Swap() {
     const { address, isConnected } = useAccount();
     const [fromAmount, setFromAmount] = useState("");
     const [toAmount, setToAmount] = useState("");
     const [tokenContractAddress, setTokenContractAddress] = useState("0x0");

     const tokenContract = useContract({
       address: tokenContractAddress,
       abi: TokenABI,
       chainId: 1
     })

     const { config: swapConfig, error: prepareError } = usePrepareContractWrite({
       ...tokenContract,
         functionName: 'swap',
         args: [ethers.parseEther(fromAmount), ethers.parseEther(toAmount)],
     })

     const { data, error: writeError, isLoading, isSuccess, write } = useContractWrite(swapConfig)
   
     const handleFromAmountChange = (e) => {
       setFromAmount(e.target.value);
     };

     const handleToAmountChange = (e) => {
       setToAmount(e.target.value);
     };
   
    const handleAddressChange = (e) => {
     setTokenContractAddress(e.target.value);
    }
 
     const swapTokens = async () => {
         if (write && config?.args) {
           try {
             write();
           } catch (error) {
             console.error('Error:', error);
           }
         } else if(prepareError) {
           console.log(prepareError);
         } else {
           console.log('config not set')
         }
   }
   
   
     return (
     <div>
         {isConnected ? (
             <div>
                <input
                type="text"
                 placeholder="Token Address"
                 value={tokenContractAddress}
                 onChange={handleAddressChange}
                />
                 <input
                 type="number"
                 placeholder="From Amount"
                 value={fromAmount}
                 onChange={handleFromAmountChange}
                 />
                 <input
                 type="number"
                 placeholder="To Amount"
                 value={toAmount}
                 onChange={handleToAmountChange}
                 />
                 <button onClick={swapTokens}>Swap</button>
             </div>
         ) : (
             "Connetti il tuo wallet"
         )}
     </div>
     );
 }
 
 export default Swap;
