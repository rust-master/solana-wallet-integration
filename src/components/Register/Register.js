import React, { useEffect, useState } from "react";
import "./register.css";
const { binary_to_base58 } = require('base58-js')

function Register() {
    const [walletAddress, setWalletAddress] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [signature, setSignature] = useState(null);

    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window;

            if (solana) {
                if (solana.isPhantom) {
                    console.log("Phantom wallet found!");
                    const response = await solana.connect({ onlyIfTrusted: true });
                    console.log(
                        "Connected with Public Key:",
                        response.publicKey.toString()
                    );

                    setWalletAddress(response.publicKey.toString());
                }
            } else {
                alert("Solana object not found! Get a Phantom Wallet 👻");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const connectWallet = async () => {
        const { solana } = window;

        if (solana) {
            const response = await solana.connect();
            console.log("Connected with Public Key:", response.publicKey.toString());
            setWalletAddress(response.publicKey.toString());

            const message = "PAKCOIN"
            const encodedMessage = new TextEncoder().encode(message)
            const signedMessage = await solana.signMessage(encodedMessage, 'utf8')

            console.log("Encoded Message:", encodedMessage.toString());
            console.log("Signed Message:", signedMessage.toString());


            // determine b58 encoded signature
            if (signedMessage.data && signedMessage.data.signature) {
                // slope format

                console.log(`publicKey=${signedMessage.data.publicKey}, signature=${signedMessage.data.signature}`)
                // setSignature(signedMessage.data.signature)
                // setPublicKey(signedMessage.data.publicKey)
            } else {
                // phantom and solflare format
                console.log("signature=", binary_to_base58((signedMessage.signature) ? signedMessage.signature : signedMessage))
                // setPublicKey(solana.publicKey.toString())
                console.log(`publicKey=${solana.publicKey.toString()})`)
            }
            // console.log(`publicKey=${publicKey}, signature=${signature}`)
        }
    };

    const renderNotConnectedContainer = () => (
        <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}
        >
            Connect to Wallet
        </button>
    );

    // const renderConnectedContainer = () => {
    //   // If we hit this, it means the program account hasn't been initialized.
    //   if (gifList === null) {
    //     return (
    //       <div className="connected-container">
    //         <button className="cta-button submit-gif-button">
    //           Connect Wallet
    //         </button>
    //       </div>
    //     )
    //   }
    //   // Otherwise, we're good! Account exists. User can submit GIFs.
    //   else {
    //     return (
    //       <div className="connected-container">
    //         <div className="gif-grid">
    //           <h1>Home</h1>
    //         </div>
    //       </div>
    //     )
    //   }
    // }

    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);


    useEffect(() => {
        if (walletAddress) {
            console.log('Fetching GIF list...');

        }
    }, [walletAddress]);

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    {!walletAddress && renderNotConnectedContainer()}
                    {/* We just need to add the inverse here! */}
                    {/* {walletAddress && renderConnectedContainer()} */}
                </div>
            </div>
        </div>
    );
};

export default Register;
