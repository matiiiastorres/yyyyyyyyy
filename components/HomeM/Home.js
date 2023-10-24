import React, { useState } from 'react';
import { HiQrcode } from 'react-icons/hi';
// import { Web3 } from '../HomeM/TW.png';
import { MdOutlineDashboard } from 'react-icons/md';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageSquare, FiFolder, FiShoppingCart } from 'react-icons/fi';
// import yo from '../menu/TW.png';
// import Calculator from '../Calculator';
// import TucuWallet from '../TucuWallet';
// import TucuWalletCard from '../TucuWalletCard';
// import PerfilWeb3 from '../perfilWeb3/PerfilWeb3';

// import WalletApp from '../Wallet/WalletApp';
// import WalletView from '../Wallet/WalletView';
// import QRCode from 'react-qr-code';
import HomeWallet from '../Wallet/HomeWallet';
import CreateAccount from '../Wallet/CreateAccount';

const Home = (setWallet, setSeedPhrase, wallet, seedPhrase, selectedChain) => {
  const menus = [
    {
      name: 'Aqui editas tu perfil si ya ingresaste',
      link: '/dashboard',
      icon: AiOutlineUser,
    },
    { name: 'Aqui Ingresas si ya te Registraste', link: '/login', icon: AiOutlineHeart },
    { name: 'Aqui te Registras en Tucuwallet ', link: '/apply', icon: FiFolder },
    // { name: 'analytics', link: '/', icon: TbReportAnalytics, margin: true },
    // { name: 'File Manager', link: '/', icon: FiFolder },
    // { name: 'Cart', link: '/', icon: FiShoppingCart },
    // { name: 'Saved', link: '/', icon: AiOutlineHeart, margin: true },
    // { name: 'Setting', link: '/', icon: RiSettings4Line },
  ];

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <section className="flex gap-6">
      <div
        className={`   ${
          open ? 'w-full h-screen  bg-[#000000]' : 'w-24 bg-[#44444405] h-12'
        } duration-500 text-stone-100 px-4 fixed top-0 left-0 right-0 z-50`}
      >
        <div className="pt-3 flex">
          <img
            onClick={toggleMenu}
            src="https://tucuwallet.netlify.app/static/media/aaaa-removebg-preview.039f7e84adfbe98bd798.png"
            className="h-8  mt--4 cursor-pointer"
            alt="Company Logo"
            // size={26}
          />
        </div>
        <div className="flex flex-col gap-4 relative">
          {/* <img
            src="https://tucuweb3.netlify.app/perfil%20web3.png"
            className={`whitespace-pre duration-500 w-32 absolute rounded-full mt--4  left-36 -translate-x-1/2  ${
              !open && 'opacity-0 overflow-hidden'
            }`}
          /> */}

          <br />
          <br />

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <br />
          <br />

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div
            className={`whitespace-pre duration-500 w-60 absolute  mt--4  left-32 -translate-x-1/2  ${
              !open && 'opacity-0 overflow-hidden'
            }`}
          >
            {menus?.map((menu, i) => (
              <>
                <a
                  href={menu?.link}
                  key={i}
                  className={` ${
                    menu?.margin && 'mt-5'
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hoverbg-[#000000]' rounded-md`}
                >
                  <div
                    className={`whitespace-pre duration-500 ${
                      !open && 'opacity-0 translate-x-28 overflow-hidden'
                    }`}
                  >
                    {React.createElement(menu?.icon, { size: '20' })}
                  </div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && 'opacity-0 translate-x-28 overflow-hidden'
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && 'hidden'
                    } absolute left-48bg-[#000000]  font-semibold whitespace-pre text-gray-200 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </a>
              </>
            ))}

            <div className="   left-36">
              {/* <h4 className=" left-36  text-stone-950 ">
                Bienvenido a TucuWallet
              </h4> */}
              <br />
              {/* <HomeWallet /> */}
              <CreateAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
