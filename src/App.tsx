import { FC } from "react";
import Context from "./components/Context/Context";
import ConnectWallet from "./components/ConnectWallet/ConnectWallet";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from "./components/Register/Register";
import { Permissions } from "discord.js";

require("./App.css");
require("@solana/wallet-adapter-react-ui/styles.css");


const App: FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <Context>
                            <div className="app">
                                <ConnectWallet />
                            </div>
                        </Context>} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
export default App;