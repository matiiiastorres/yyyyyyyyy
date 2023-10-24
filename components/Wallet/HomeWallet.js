// import React from 'react';
// // import mwallet from '../menu/TW.png';
// import { Button } from 'antd';
// // import { useNavigate } from "react-router-dom";

// function Home() {
//   // const navigate = useNavigate();

//   return (
//     <>
//       <div className="content">
//         <img
//           src="https://tucuwallet.netlify.app/static/media/aaaa-removebg-preview.039f7e84adfbe98bd798.png"
//           alt="logo"
//           className="frontPageLogo"
//         />
//         <h2> Hey There 👋 </h2>
//         <h4 className="h4"> Welcome to your Web3 Wallet</h4>
//         <Button
//           onClick={() => navigate('/yourwallet')}
//           className="frontPageButton"
//           type="primary"
//         >
//           Create A Wallet
//         </Button>
//         <Button
//           onClick={() => navigate('/recover')}
//           className="frontPageButton"
//           type="default"
//         >
//           Sign In With Seed Phrase
//         </Button>
//         <p className="frontPageBottom">
//           Find Alt Coin Gems:{' '}
//           <a href="https://moralismoney.com/" target="_blank" rel="noreferrer">
//             money.moralis.io
//           </a>
//         </p>
//       </div>
//     </>
//   );
// }

// export default Home;

// import React from 'react';

// const HomeWallet = () => {
//   return (
//     <div className=" bg-[#000000] min-h-screen flex flex-col justify-center items-center">
//       <img
//         src="https://tucuwallet.netlify.app/static/media/aaaa-removebg-preview.039f7e84adfbe98bd798.png"
//         alt="logo"
//         className="w-36"
//       />
//       <h2 className="text-3xl font-bold mt-5 text-gray-800">Hey There 👋</h2>
//       <h4 className="text-lg text-gray-800 mb-10">
//         Welcome to your Web3 Wallet
//       </h4>
//       <a href="/yourwallet">
//         <a className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full text-lg mb-3 w-36 text-center">
//           Create A Wallet
//         </a>
//       </a>
//       <a href="/recover">
//         <a className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 rounded-full text-lg w-80 text-center">
//           Sign In With Seed Phrase
//         </a>
//       </a>
//       {/* <p className="text-gray-600 mt-5">
//         Find Alt Coin Gems:{' '}
//         <a
//           href="https://moralismoney.com/"
//           target="_blank"
//           rel="noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           money.moralis.io
//         </a>
//       </p> */}
//     </div>
//   );
// };

// export default HomeWallet;

import React from 'react';
// import mwallet from '../public/mwallet.png';
// import { Button } from 'antd';
import { useRouter } from 'next/router';

const HomeWallet = () => {
  const router = useRouter();

  return (
    <>
      <div className="content">
        {/* <img src={mwallet} alt="logo" className="frontPageLogo" /> */}
        {/* <h2 className=" text-stone-950"> Hola 👋 </h2> */}
        <h4 className="h4  text-stone-950 "> Bienvenido a TucuWallet</h4>
        {/* <Button
          onClick={() => router.push('/yourwallet')}
          className="frontPageButton"
          type="primary"
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => router.push('/yourwallet')}
          className="frontPageButton"
          type="default"
        >
          Sign In With Seed Phrase
        </Button> */}
        {/* <p className="frontPageBottom">
          Find Alt Coin Gems:{' '}
          <a href="https://moralismoney.com/" target="_blank" rel="noreferrer">
            money.moralis.io
          </a>
        </p> */}
      </div>
    </>
  );
};

export default HomeWallet;
