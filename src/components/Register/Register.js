import React, { useEffect, useState } from "react";
import "./register.css";
const { binary_to_base58 } = require('base58-js');

function getParam(param) {
    let parameter = new URLSearchParams(window.location.search).get(param);
    if (!parameter)
        parameter = new URLSearchParams(window.location.hash).get(param); // this will not return correctly because we have a ? after the hash
    //console.log(param + ': ' + parameter);
    return parameter;
}


function Register() {
    const [code, setCode] = React.useState(getParam('code'));
    const [walletAddress, setWalletAddress] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [signature, setSignature] = useState(null);

    const [serverLogo, setServerLogo] = React.useState(decodeURIComponent("grape.png"));


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

            const message = "$PAKCOIN"
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

    const discordDetails = () => (
        <div className="header">
            {/* <img
                elevation={4}
                alt="Grape"
                src={`/server-logos/${serverLogo}`}
                style={{ width: "160px", height: "160px" }}
            /> */}
            <img
                elevation={4}
                alt="Discord"
                src={`https://cdn.discordapp.com/avatars/752156525723779074/2d7953529d448b83dbc30d10ab83b277?size=512`}
                style={{ width: "160px", height: "160px" }}
            />
        </div>
    )

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
        console.log("code: " + code);
        if (walletAddress) {
            // log with emjoi
            console.log(`💰  ${walletAddress}`);

        }
    }, [walletAddress]);

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    {!walletAddress && discordDetails()}
                    {!walletAddress && renderNotConnectedContainer()}
                    {/* We just need to add the inverse here! */}
                    {/* {walletAddress && renderConnectedContainer()} */}

                </div>
                <h1>{code}</h1>
            </div>
        </div>
    );
};

export default Register;
