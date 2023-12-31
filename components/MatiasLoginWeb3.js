import React, { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES, IProvider } from '@web3auth/base';
import {
  OpenloginAdapter,
  OPENLOGIN_NETWORK,
} from '@web3auth/openlogin-adapter';
import RPC from './ethersRPC';

import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';

const clientId =
  'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ'; // get from https://dashboard.web3auth.io

function MatiasLoginWeb3() {
  const [web3auth, setWeb3auth] = useState(null);
  const [torusPlugin, setTorusPlugin] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth', // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          // uiConfig refers to the whitelabeling options, which is available only on Growth Plan and above
          // Please remove this parameter if you're on the Base Plan
          uiConfig: {
            appName: 'W3A',
            // appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
            theme: {
              primary: 'red',
            },
            mode: 'dark',
            logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
            logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
            defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
            loginGridCol: 3,
            primaryButton: 'externalLogin', // "externalLogin" | "socialLogin" | "emailLogin"
          },
          web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: 'optional',
          },
          adapterSettings: {
            uxMode: 'redirect', // "redirect" | "popup"
            whiteLabel: {
              logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
              logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
              defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
              mode: 'dark', // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: '#00a8ff' } },
              logoDark: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
              logoLight: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        setTorusPlugin(torusPlugin);
        await web3auth.addPlugin(torusPlugin);

        setWeb3auth(web3auth);

        await web3auth.initModal();

        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();

    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const showWCM = async () => {
    if (!torusPlugin) {
      uiConsole('torus plugin not initialized yet');
      return;
    }
    torusPlugin.showWalletConnectScanner();
    uiConsole();
  };

  const initiateTopUp = async () => {
    if (!torusPlugin) {
      uiConsole('torus plugin not initialized yet');
      return;
    }
    torusPlugin.initiateTopup('moonpay', {
      selectedAddress: '0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF',
      selectedCurrency: 'USD',
      fiatValue: 100,
      selectedCryptoCurrency: 'ETH',
      chainNetwork: 'mainnet',
    });
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };

  const addChain = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const newChain = {
      chainId: '0x5',
      displayName: 'Goerli',
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      tickerName: 'Goerli',
      ticker: 'ETH',
      decimals: 18,
      rpcTarget: 'https://rpc.ankr.com/eth_goerli',
      blockExplorer: 'https://goerli.etherscan.io',
    };
    await web3auth?.addChain(newChain);
    uiConsole('New Chain Added');
  };

  const switchChain = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    await web3auth?.switchChain({ chainId: '0x5' });
    uiConsole('Chain Switched');
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args) {
    const el = document.querySelector('#console>p');
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        <div>
          <button onClick={showWCM} className="card">
            Show Wallet Connect Modal
          </button>
        </div>
        <div>
          <button onClick={initiateTopUp} className="card">
            initiateTopUp
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={addChain} className="card">
            Add Chain
          </button>
        </div>
        <div>
          <button onClick={switchChain} className="card">
            Switch Chain
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className=" bg-[#fdfdfd] container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web3Auth{' '}
        </a>
        & ReactJS Ethereum Example
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/examples/tree/main/web-modal-sdk/evm/react-evm-modal-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
        {/* <h3>{address}</h3> */}
      </footer>
    </div>
  );
}

export default MatiasLoginWeb3;
