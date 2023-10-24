import { useState } from 'react';
import { useRouter } from 'next/router';
// import logo from '../public/moralisLogo.svg';
import { Select } from 'antd';
import HomeWallet from '../Wallet/HomeWallet';

import CreateAccount from '../Wallet/CreateAccount';
// import RecoverAccount from '../Wallet/RecoverAccount';
import WalletView from '../Wallet/WalletView';

const WalletApp = () => {
  const router = useRouter();
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState('0x1');

  const handleSelectChange = (val) => {
    setSelectedChain(val);
  };

  return (
    <div className="flex flex-col items-center">
      <header className=" py-3 flex justify-between items-center mb-5">
        {/* <img src={logo} className="h-10 ml-5" alt="logo" /> */}
        <Select
          onChange={handleSelectChange}
          value={selectedChain}
          options={[
            {
              label: 'Ethereum',
              value: '0x1',
            },
            {
              label: 'Mumbai Testnet',
              value: '0x13881',
            },
            {
              label: 'Polygon',
              value: '0x89',
            },
            {
              label: 'Avalanche',
              value: '0xa86a',
            },
          ]}
          className="mr-5"
        />
      </header>
      {wallet && seedPhrase ? (
        <>
          <WalletView
            wallet={wallet}
            setWallet={setWallet}
            seedPhrase={seedPhrase}
            setSeedPhrase={setSeedPhrase}
            selectedChain={selectedChain}
          />
          <p>matii</p>
        </>
      ) : (
        <>
          <p>mati4</p>
          {router.pathname === '/yourwallet' && (
            <>
              <HomeWallet />
              <CreateAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            </>
          )}
          {/* <p>mati4</p>
          {router.pathname === '/yourwallet' && <HomeWallet />} */}
          {/* {router.pathname === '/yourwallet' && (
            <RecoverAccount
              setSeedPhrase={setSeedPhrase}
              setWallet={setWallet}
            />
          )} */}
          {/* {router.pathname === '/yourwallet' && (
            <CreateAccount
              setSeedPhrase={setSeedPhrase}
              setWallet={setWallet}
            />
          )} */}
        </>
      )}
    </div>
  );
};

export default WalletApp;
