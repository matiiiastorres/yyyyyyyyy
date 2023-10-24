import React from 'react';
import { Button, Card, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ethers } from 'ethers';
import QRCode from 'react-qr-code';
// import ShareButton2 from '../ShareButton2';

function CreateAccount({ setWallet, setSeedPhrase }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const [showNewAccount, setShowNewAccount] = useState(false);
  // const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
    setShowNewAccount(true);
  }

  function setWalletAndMnemonic() {
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }

  return (
    <>
      <div className="content ">
        <div className="mnemonic">
          {/* <ExclamationCircleOutlined style={{ fontSize: '20px' }} /> */}
          {/* <div>
            Una vez que genere la frase inicial, guárdela de forma segura para
            recuperar su billetera en el futuro.
          </div> */}
        </div>
        <Button
          className="frontPageButton   bg-[#3f3ff8] "
          type="primary"
          onClick={() => generateWallet()}
        >
          Generar contraceña de 12 Palabras
        </Button>
        <Card className="seedPhraseContainer ">
          {newSeedPhrase && (
            <pre style={{ whiteSpace: 'pre-wrap' }}>{newSeedPhrase}</pre>
          )}
        </Card>

        {/* <Button
          className="frontPageButton"
          type="default"
          onClick={() => setWalletAndMnemonic()}
        >
          Open Your New Wallet
        </Button> */}

        {/* Mostrar la nueva cuenta si showNewAccount es true */}
        {showNewAccount && (
          <div className="newAccountContent ">
            {/* <p>Informacion de Nueva Cuenta:</p> */}
            <Tooltip title={ethers.Wallet.fromPhrase(newSeedPhrase).address}>
              <div className=" ">
                <QRCode
                  value={ethers.Wallet.fromPhrase(newSeedPhrase).address}
                  className=" flex flex-col m-10 border-solid border-2 border-blue-600 "
                />
              </div>
            </Tooltip>

            <div className=" m-10">
              <p className="  left-36 text-stone-100">
                Direccion de Billetera:
              </p>
              {/* Mostrar solo los primeros 6 y últimos 4 caracteres */}
              <p className="  left-36 text-stone-100">
                {`${ethers.Wallet.fromPhrase(newSeedPhrase).address.slice(
                  0,
                  10
                )}...${ethers.Wallet.fromPhrase(newSeedPhrase).address.slice(
                  -10
                )}`}
              </p>
            </div>
            {/* <Tooltip title={ethers.Wallet.fromPhrase(newSeedPhrase).address}>
            </Tooltip> */}
          </div>
        )}

        {/* <p className="frontPageBottom" onClick={() => navigate('/')}>
          Back Home
        </p> */}
      </div>
    </>
  );
}

export default CreateAccount;
