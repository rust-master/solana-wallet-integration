import { FC } from "react";
import Context from "./components/Context/Context";
import ConnectWallet from "./components/ConnectWallet/ConnectWallet";


require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC = () => {
    return (
        <div>
            <Context>
                < div className="app">
                    <ConnectWallet />
                </div>
            </Context>
        </div>
    );
};
export default App;