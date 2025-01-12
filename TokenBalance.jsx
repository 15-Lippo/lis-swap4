    import React, { useState, useEffect } from "react";
    import { useAccount, useBalance } from 'wagmi'

    function TokenBalance() {
    const { address, isConnected } = useAccount()
    const [tokenBalance, setTokenBalance] = useState(0);
    const { data } = useBalance({
        address: address,
    })

    useEffect(() => {
        if (data?.formatted) {
        setTokenBalance(data.formatted)
        }
    }, [data])
    return (
        <div>
          {isConnected ? 
          <div>
            Balance: {tokenBalance}
          </div> : 
            "Connect Wallet"
            }
        </div>
    );
    }

    export default TokenBalance
