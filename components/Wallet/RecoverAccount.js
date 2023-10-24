import React, { useState } from 'react';
import { BulbOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';

const { TextArea } = Input;

const RecoverAccount = ({ setWallet, setSeedPhrase }) => {
  const router = useRouter();
  const [typedSeed, setTypedSeed] = useState('');
  const [nonValid, setNonValid] = useState(false);

  const seedAdjust = (e) => {
    setNonValid(false);
    setTypedSeed(e.target.value);
  };

  const recoverWallet = () => {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromMnemonic(typedSeed);
    } catch (err) {
      setNonValid(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    router.push('/yourwallet');
  };

  return (
    <div className="content">
      <div className="mnemonic">
        <BulbOutlined style={{ fontSize: '20px' }} />
        <div>
          Type your seed phrase in the field below to recover your wallet (it
          should include 12 words separated with spaces)
        </div>
      </div>
      <TextArea
        value={typedSeed}
        onChange={seedAdjust}
        rows={4}
        className="seedPhraseContainer"
        placeholder="Type your seed phrase here..."
      />
      <Button
        disabled={
          typedSeed.split(' ').length !== 12 || typedSeed.slice(-1) === ' '
        }
        className="frontPageButton"
        type="primary"
        onClick={() => recoverWallet()}
      >
        Recover Wallet
      </Button>
      {nonValid && <p style={{ color: 'red' }}> Invalid Seed Phrase</p>}
      <p className="frontPageBottom" onClick={() => router.push('/dashboard')}>
        <span>Back Home</span>
      </p>
    </div>
  );
};

export default RecoverAccount;
