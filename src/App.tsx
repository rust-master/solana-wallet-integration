import { FC } from "react";
import Context from "./components/Context/Context";
import Verify from "./components/Verify/Verify";


require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC = () => {
    return (
        <div>
            <Context>
                < div className="app">
                    <Verify />
                </div>
            </Context>
        </div>
    );
};
export default App;