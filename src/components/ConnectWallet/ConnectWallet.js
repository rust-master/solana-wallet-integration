import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "./connect.css";

function ConnectWallet() {

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

export default ConnectWallet;