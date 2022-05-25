import { useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from '@solana/wallet-adapter-react';

import "./verify.css";

function Verify() {

    const { publicKey, wallet, disconnect } = useWallet();

    useEffect(() => {
        console.log("publicKey: " + publicKey);
        console.log("wallet: " + wallet);
        console.log("disconnect: " + disconnect);

    }, []);

    return (
        <div className="verify">
            <div className="verify__header">
                <div className="appwallet" >
                    <WalletMultiButton />
                </div>
            </div>
        </div>
    );
}

export default Verify;