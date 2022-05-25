import React from 'react';
import "./verify.css";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

class Verify extends React.Component {

    render() {
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
}

export default Verify;